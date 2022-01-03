import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            name: "Onion",
            seen: "",
            images: [],
            petClicked: "",
        };
    },
    mounted() {
        fetch("/get-images")
            .then((resp) => resp.json())
            .then((data) => {
                this.images = data;
            });
    },
    methods: {
        myCustomFunction: function (arg) {
            this.petClicked = arg;
        },
        makeDisappear: function () {
            this.petClicked = null;
            // Write code here that will make the button disappear when you click on it!
        },
    },
}).mount("#main");
