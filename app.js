(function() {
    'use strict';
    angular.module("shoppingListCheckOff", [])
        .controller("toBuyController", toBuyController)
        .controller("alreadyBoughtController", alreadyBoughtController)
        .service("shoppingListCheckOffService", shoppingListCheckOffService);

    toBuyController.$inject = ['shoppingListCheckOffService'];
    alreadyBoughtController.$inject = ['shoppingListCheckOffService'];

    function toBuyController(shoppingListCheckOffService) {
        var toBuyList = this;
        toBuyList.items = shoppingListCheckOffService.getItems();

        toBuyList.bought = function(index) {
            shoppingListCheckOffService.bought(index);
            if (toBuyList.items.length == 0) {
                toBuyList.msg = "Everything is bought!";
            }
        };
    };

    function alreadyBoughtController(shoppingListCheckOffService) {
        var alreadyBoughtList = this;
        alreadyBoughtList.items = shoppingListCheckOffService.getItemsAlreadyBought();
        if (alreadyBoughtList.items.length == 0) {
            alreadyBoughtList.msg = "Nothing Bought Yet.";
        }
    };

    function shoppingListCheckOffService() {
        var service = this;
        var itemsToBuy = [{
                name: "cookies",
                quantity: 10
            },
            {
                name: "pasta",
                quantity: 5
            },
            {
                name: "chocolate chips",
                quantity: 100
            },
            {
                name: "ice creams",
                quantity: 50
            },
            {
                name: "pomigrante",
                quantity: 10
            }
        ];
        var itemsAlreadyBought = [];
        var msg;

        service.getItems = function() {
            return itemsToBuy;
        }

        service.bought = function(index) {
            addItemInAlreadyBoughtList(index);
            itemsToBuy.splice(index, 1);
        };

        function addItemInAlreadyBoughtList(index) {
            itemsAlreadyBought.push(itemsToBuy[index]);
        };

        service.getItemsAlreadyBought = function() {
            return itemsAlreadyBought;
        };
    };
})();