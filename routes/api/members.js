const express = require('express');
const uuid = require('uuid');
const router = express.Router()
const members = require('../../Members');

// Gets All Members
router.get('/', (req, res) => {
    res.json(members);
});

// Get single Member
router.get('/:id', (req, res) => {
    // res.send(req.params.id)
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        // We return a json object with the filtered result
        // That result will have the same id that is found in req.params.id
        // The req.params.id returns a string, so we use parseInt to convert it to a number
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        // If an ID can't be found with the matching req.params.id, we will return an error message, stating we can't find that ID
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// Create Member
router.post('/', (req, res) => {
    // res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: `Please include a name and email.`})
    }

    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

// Update Member
// Usually the same as the create method, but it will be a put request
router.put('/:id', (req, res) => {
    // res.send(req.params.id)
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        // We return a json object with the filtered result
        // That result will have the same id that is found in req.params.id
        // The req.params.id returns a string, so we use parseInt to convert it to a number
        const updMember = req.body;
        members.forEach(member => {
            // Check if the member ID matches the id in the put request route
            if (member.id === parseInt(req.params.id)){
                // If a name or email was set with the request, we update it with the updated name
                // If no name or email was sent as part of the request, the name or email stays the same
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({ msg: `Member updated`, member})
            }
        })
    } else {
        // If an ID can't be found with the matching req.params.id, we will return an error message, stating we can't find that ID
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        // If a name or email was set with the request, we delete the member with the matching ID
        res.json({msg: 'Member deleted', members: (members.filter(member => member.id !== parseInt(req.params.id)))});
    } else {
        // If no id was found, we return an error.
        res.status(400).json({nsg: `No member with the id of ${req.params.id}`});
    }
})

module.exports = router;