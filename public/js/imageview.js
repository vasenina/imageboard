const imageView = {
    data() {
        return {
            image: {},
        };
    },
    props: ["imgId"],
    mounted() {
        console.log("first component just mounted");
        console.log("this.someProp:", this.imgId);
        //console.log("this.moodId:", this.moodId);

        fetch("/getimage?id=" + this.imgId)
            .then((resp) => resp.json())
            .then((data) => {
                this.image = data;
                console.log(this.image);
            });
    },

    methods: {
        notifyParent() {
            this.$emit("close");
        },
    },
    template: `<div>
    <div class = "overlay" @click="notifyParent">
      <div class = "modal">
            
                <span class="close-btn" @click="notifyParent" >X</span>
                <img :src = image.url class = "img-big" />
                <h2>{{image.title}}</h2>
                <p>{{image.description}}</p>
                <p>{{image.username}}</p>
                
                

        </div>
    </div>
    
    </div>`,
};

export default imageView;
