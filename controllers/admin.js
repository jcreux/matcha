var User = require('../models/users');
const adminreq = require('../models/admin.req');
const adminlib = require('../models/admin.lib');
const swipereq = require('../models/swipe.req');
const db = require('../db/database');

exports.getIndex = (req, res, next) => {
    if (req.session.username == null)
        return res.redirect('/login');
    if(req.session.username != 'ROOT')
        return res.redirect('/user/profile');
    res.render('admin/index', {
        notifs:req.session.notifs,
        pageTitle: 'Admin home page',
        path: '/index'
    });
}

exports.postSearch = (req, res, next) => {
    if (req.session.username == null)
        return res.redirect('/login');
    if(req.session.username != 'ROOT')
        return res.redirect('/user/profile');
    User.fetchAllbyusername(req.body.user).then((results) =>{
            res.render('admin/result', {
                fullpage : "admin",
                notifs:req.session.notifs,
                pageTitle: 'Admin home page',
                user: results[0],
                path: '/result'
            });
    });
}

exports.getDel = (req, res, next) => {
    if (req.session.username == null)
        return res.redirect('/login');
    if(req.session.username != 'ROOT')
        return res.redirect('/user/profile');
        db.query('SELECT * FROM users WHERE user_id = ?',
        [req.params.id]).then(async (result) =>{
            if (result[0].length)
            {
                await db.query('DELETE FROM `details` WHERE user_id = ?', [req.params.id]);
                await db.query('DELETE FROM `likes` WHERE liker_id = ? OR liked_id = ?', [req.params.id,req.params.id]);
                await db.query('DELETE FROM `reports` WHERE reporter_id = ? OR reported_id = ?', [req.params.id, req.params.id]);
                await db.query('DELETE FROM `blocks` WHERE blocker_id = ? OR blocked_id = ?', [req.params.id, req.params.id]);
                await db.query('DELETE FROM `users` WHERE user_id = ?', [req.params.id]);
            }
        });
    if ((req.originalUrl.split('/')[4]) == "admin")
        res.redirect("/admin")
    else
        res.redirect((req.originalUrl.split('/')[4]).replace(/_/g, "\/"));
}

exports.getReports = async (req, res, next) => {
    if (req.session.username == null)
        return res.redirect('/login');
    if(req.session.username != 'ROOT')
        return res.redirect('/user/profile');
    let tab = (await adminreq.getReports())[0];
    tab = await adminlib.countreports(tab);
    const page = req.params.page;
    ret = [];
    for (let i = 0; i < tab.length;i++)
    {
        let reportedinfos = (await swipereq.getAllbyId(tab[i].id))[0][0];
        if (reportedinfos)
            ret[i] = {id : tab[i].id, firstname : reportedinfos.firstname, age : reportedinfos.age, bio : reportedinfos.bio, hashtags : reportedinfos.interests, reports : tab[i].reports}
    }
     res.render('admin/reports', {
         page,
         notifs:req.session.notifs,
         pageTitle: 'Admin report page',
         user : ret,
         fullpage : req.url.replace(/\//g, "_"),
         path: '/admin/reports'
     });
}
