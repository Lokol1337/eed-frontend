<template>
    <div class="b-nav">
        <div class="b-content">
            <BNavItem
            ></BNavItem>
        </div>
        <button class="btn b-btn p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
        </button>
    </div>
</template>

<style>
.b-nav {
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 5rem;
    padding-left: 85px;
    padding-top: .3rem;
    padding-bottom: .3rem;
    padding-right: 1rem;
    background-color: #292c636d;
    z-index: 10000000;
    display: flex;
    justify-content: space-between;
}

.b-nav .b-btn {
    border-radius: 9px;
    background-color: #292c63;
    width: 4rem;
    height: 4rem;
    margin: .3rem
}

.b-nav .b-btn svg {
    fill: white;
    height: 100%;
    transition: all .5s;

}

.b-nav .b-btn:hover svg {
    fill: rgb(38, 38, 38);
    rotate: 180deg;
    transition: all .5s;
}

.b-nav .b-btn:hover {
    background-color: #565ee7;
}

.b-nav .b-content {
    width: 85%;
    padding: .3rem;
    display: flex;
}

.b-nav .b-content * {
    margin-right: .4rem
}
</style>

<script>
import bNavItem from './bNavItem.vue';
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    props: {

    },
    components:{
        bNavItem
    }
}
</script>