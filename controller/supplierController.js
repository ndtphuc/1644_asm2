const express = require('express');
const mongoose = require('mongoose');
const Supplier = mongoose.model('Supplier');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("supplier/addOrEdit", {
        viewTitle: "Insert Supplier"
    })
})

router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})


function insertRecord(req, res) {
    var supplier = new Supplier();
    supplier.supName = req.body.supName;
    supplier.supAddress = req.body.supAddress;


    supplier.save((err, doc) => {
        if (!err) {
            res.redirect('supplier/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("supplier/addOrEdit", {
                    viewTitle: "Insert Supplier",
                    supplier: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Supplier.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('supplier/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("supplier/addOrEdit", {
                    viewTitle: 'Update Supplier',
                    supplier: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list', (req, res) => {
    Supplier.find((err, docs) => {
        if (!err) {
            res.render("supplier/list", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Supplier.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("supplier/addOrEdit", {
                viewTitle: "Update Supplier",
                supplier: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Supplier.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/supplier/list');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'supName':
                body['supNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;