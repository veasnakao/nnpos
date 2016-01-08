Meteor.methods({
    insertPurchasePayment: function (obj) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Pos.Collection.PurchasePayments.insert(obj);
    },
    directInsertPurchasePayment: function (obj) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Pos.Collection.PurchasePayments.direct.insert(obj);
    },
    updatePurchasePayment: function (id, set) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Pos.Collection.PurchasePayments.update(id, {$set: set});
    },
    directUpdatePurchasePayment: function (id, set, unset) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        var updateObject = {};
        if (set != null) updateObject.$set = set;
        if (unset != null) updateObject.$unset = unset;
        Pos.Collection.PurchasePayments.direct.update(id, updateObject)
    }
});