Meteor.methods({
    insertCustomer: function () {
        Meteor.defer(function () {
            for (var i = 1; i <= 10000; i++) {
                var prefix = "001-";
                var customer = {};
                customer._id = idGenerator.genWithPrefix(Pos.Collection.Customers, prefix, 6);
                customer.name = "Name" + i;
                customer.gender = "M";
                customer.locationId = "001-002";
                customer.branchId = "001";
                Pos.Collection.Customers.insert(customer);
            }
        });
    },
    insertProduct: function () {
        Meteor.defer(function () {
            for (var i = 1; i <= 10000; i++) {
                var product = {};
                product._id = idGenerator.gen(Pos.Collection.Products, 7);
                product.name = "pro" + i;
                product.retailPrice = 200;
                product.wholesalePrice = 180;
                product.purchasePrice = 175;
                product.productType = "Stock";
                product.status = "enable";
                product.categoryId = "0000003";
                product.unitId = "001";
                product.barcode = "b" + i;
                Pos.Collection.Products.insert(product);
            }
        });
    }
});


Meteor.startup(function () {
    if (!Pos.Collection.Products.find().count()) {
        // fill BigCollection
    }
});

Meteor.methods({
    search: function (query, options) {
        options = options || {};
        // guard against client-side DOS: hard limit to 50
        if (options.limit) {
            options.limit = Math.min(50, Math.abs(options.limit));
        } else {
            options.limit = 50;
        }
        // TODO fix regexp to support multiple tokens
        var regex = new RegExp("^" + query);
        return Pos.Collection.Products.find({name: {$regex: regex}}, options).fetch();
    }
});