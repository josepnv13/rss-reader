<script setup>
import { useFeedStore } from '../stores/store';
const store= useFeedStore();
</script>
<template>
    <div class="main">
        <h1 v-if="store.current.source">{{store.current.source.name}}</h1>
        <details v-for="post in store.current.items" :key="post.title">
            <summary>{{post.title}}</summary>
            <div v-html="post.content"></div>

        </details>

    </div>
</template>
<style scoped>
.main{
    background-color: #213442;
    color: white;
    grid-column-start: 2;
    grid-column-end: 3;
    padding: 20px 80 px 20 px 40 px;

}
summary{
    padding: 5px;
    cursor: pointer;
    border-radius: 3px;
}

summary:hover{
    background-color: rgb(174,221,225);
    color: black;
}

</style>