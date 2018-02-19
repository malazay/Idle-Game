Vue.component('friend-component', {
    props: ['friend'],
    filters: {
      fullName(value){
          return `${value.last}, ${value.first}`;
      }  
    },
    methods: {
        incrementStat(stat) {
            this.stats[stat]++;
        }
    },
    templates: 
    `<div>
        <h4>{{friend.name}}</h4>
    </div>`
    // <h3 v-for="(value, key) in stats">{{ key }}: {{ value }}</h3>
});

const app = new Vue({
    el: "#app",
    data: {
        friends: [
            {
                first: "Teto",
                last: "Medina",
                age: 100
            },
            {
                first: "Tito",
                last: "Puentes",
                age: 210
            }
        ]
    },
    templates: 
    `<div>
        <friend-component v-for="item in friends" v-bind:friend="item"/>
    </div>`
})