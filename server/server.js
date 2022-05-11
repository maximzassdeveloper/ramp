'use strict';
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const util = require('util');
const pluralize = require('pluralize');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Without the included parameter, we work off nested resources.
if (!argv.included) {
    // Simple ad-hoc query for nested resources.
    // e.g. embedUserGroup(userObject, 'groups')
    function embedUserGroup(resource, e) {
        console.log(resource);
        e && [].concat(e)
            .forEach((relationship) => {
                if (router.db.get(relationship).value) {
                    // If you want to embed users, you're passing a group so we query by its groupId.
                    const relationshipKey = relationship === 'users' ? 'groupId' : 'userId';
                    const query = {};
                    query[relationshipKey] = resource.id;
                    const items = router.db.get('users_groups').filter(query).value();
                    const otherResourceKey = relationshipKey === 'groupId' ? 'userId' : 'groupId';
                    const ids = items.map((item) => item[otherResourceKey]);
                    resource[relationship] = router.db.get(relationship).filter((elem) => {
                        if (elem.id in ids) return true;
                    }).value();
                }
            });
    }

    server.use('/users/:id/groups', (req, res, next) => {
        const user = router.db.get('users')
            .getById(req.params.id)
            .cloneDeep()
            .value();

        if (util.isUndefined(user)) {
            return res.status(400).json({ message: "invalid user id" });
        }

        embedUserGroup(user, 'groups')
        return res.status(200).json(user);
    });

    server.use('/groups/:id/users', (req, res, next) => {
        const group = router.db.get('groups')
            .getById(req.params.id)
            .cloneDeep()
            .value();

        if (util.isUndefined(group)) {
            return res.status(400).json({ message: "invalid group id" });
        }

        embedUserGroup(group, 'users')
        return res.status(200).json(group);
    });
} else if (argv.included) {

    // Includes one or more many-to-many relationships into `obj`. `resource` is provided for the known side of the association.
    function include(obj, resource, includes) {
        if(util.isNullOrUndefined(obj)) return;

        includes && [].concat(includes)
            .forEach((relationship) => {
                if (router.db.get(relationship).value) {
                    let singularResource = pluralize.singular(resource);
                    let singularRelationship = pluralize.singular(relationship);
                    let manyMany = null;

                    // this table lookup could be cached

                    if(`${singularResource}_${singularRelationship}` in router.db.__wrapped__) {
                        // e.g. user_group
                        manyMany = `${singularResource}_${singularRelationship}`;
                    } else if (`${singularRelationship}_${singularResource}` in router.db.__wrapped__) {
                        // e.g. group_user
                        manyMany = `${singularRelationship}_${singularResource}`;
                    } else if (`${resource}_${relationship}` in router.db.__wrapped__) {
                        // e.g. users_groups
                        manyMany = `${resource}_${relationship}`;
                    } else if (`${relationship}_${resource}` in router.db.__wrapped__) {
                        // e.g. groups_users
                        manyMany = `${relationship}_${resource}`;
                    }

                    if(manyMany == null) return;

                    // assumes many-many tables are firstId, secondId relations.
                    const relationshipKey = `${singularRelationship}Id`;
                    const resourceKey = `${singularResource}Id`;

                    const joinQuery = {};
                    joinQuery[resourceKey] = obj.id;

                    const items = router.db.get(manyMany).filter(joinQuery).value();
                    if(util.isNullOrUndefined(items)) {
                        // not found
                        obj[relationship] = [];
                        return;
                    }
                    const ids = items.map((item) => item[relationshipKey]);

                    const related = router.db.get(relationship).filter((elem) => {
                        return ids.includes(elem.id);
                    }).value();

                    obj[relationship] = related;
                }
            });
    }

    // This is fairly generic and should work for almost all endpoints. This could be more intuitive limited to only GET.
    server.use('/:resource/:id*?', (req, res, next) => {
        let _include = req.query._include;
        delete req.query._include;

        // Only apply this middleware if we have a resource and _include query parameter.
        if(_include && req.params.resource && router.db.get(req.params.resource).value) {
            const results = res.locals.data || 
                (req.params.id && router.db.get(req.params.resource).getById(req.params.id).cloneDeep().value()) || 
                router.db.get(req.params.resource).cloneDeep().value();
            
            results && [].concat(results).forEach((result) => {
                include(result, req.params.resource, _include);
            });

            res.locals.data = results;
            // note: not return next(); because json-server doesn't check for 
            // pre-existing res.locals.data, or some other odd behavior.
            return router.render(req,res);
        }
        next();
    });
}

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running')
})