import comments from "./comments.js";

const imageView = {
    data() {
        return {
            image: {},
        };
    },
    props: ["imgId"],
    mounted() {
        fetch("/getimage?id=" + this.imgId)
            .then((resp) => resp.json())
            .then((data) => {
                this.image = data;
                console.log(this.image);
            });
    },
    components: {
        comments: comments,
    },

    methods: {
        notifyParent() {
            this.$emit("close");
        },
        closeModal(e) {
            console.log(e.target);
            // this.$emit("close");
            if (e.target.classList.contains("overlay")) {
                this.$emit("close");
            }
        },
    },
    template: `<div>
  <div class = "overlay"  @click = "closeModal"> 
      <div class = "modal">
            
                <span class="close-btn" @click="notifyParent" >X</span>
                <img :src = image.url class = "img-big" />
                <h3>{{image.title}}, {{image.country}}</h3>
                <p>{{image.description}}</p>
                <p class = "adding">posted by <b>@{{image.username}}</b></p>
                <comments v-bind:img-id=this.imgId></comments>
        </div>
   </div>
    
    </div>`,
};

export default imageView;

// <div class = "overlay" @click="notifyParent"> </div>
