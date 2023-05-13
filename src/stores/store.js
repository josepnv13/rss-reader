import { defineStore } from "pinia";

export const useFeedStore = defineStore({
    id:'feedStore',

    state: () => {
        return {

            sources:[
            {
                id:crypto.randomUUID(), 
                name:"Mozilla Hacks",
                url:"https://hacks.mozilla.org/feed" ,

            },
            ],

            current:{
                sources:null,
                items:null,
            },
        };

    },

    actions:{
        async loadSource(source){
            const response = await fetch(source.url);
            let text = await response.text();
            text=text.replace(/content:encoded/g , 'content');
            const domParser= new DOMParser();
            let doc = domParser.parseFromString(text, 'text/xml');
            console.log(doc);
            const posts=[];
            doc.querySelectorAll('item , entry').forEach((item)=>{const post = {
                title: item.querySelector('title').textContent ?? 'Sin titulo',
                content : item.querySelector('content').textContent ?? '' ,
            };
            posts.push(post);
            });
            this.current.items=[...posts];
            this.current.source= source;

        },

        async registerNewSource(url){
         try {
            const response= await fetch(url);
            let text = await response.text();
            const domParser= new DOMParser();
            let doc = domParser.parseFromString(text , 'text/xml');
            const title = doc.querySelector('channel title, feed title');
            const source= {
                id: crypto.randomUUID(),
                name: title.textContent,
                url , 
            };
            this.sources.push(source);
            
         } catch (error) {
            console.log(error);
         }
            

        },
    }

});

