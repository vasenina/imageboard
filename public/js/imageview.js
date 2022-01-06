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
    },
    template: `<div>
  <div class = "overlay" > 
      <div class = "modal">
            
                <span class="close-btn" @click="notifyParent" >X</span>
                <img :src = image.url class = "img-big" />
                <comments v-bind:img-id=this.imgId></comments>
                <h2>{{image.title}}</h2>
                <h2>{{image.country}}</h2>
                <p>{{image.description}}</p>
                <p>{{image.username}}</p>
        </div>
   </div>
    
    </div>`,
};

export default imageView;

// <div class = "overlay" @click="notifyParent"> </div>
