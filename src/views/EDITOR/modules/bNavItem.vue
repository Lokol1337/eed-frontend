<template>
    <div class="b-item step">
        1
        <button class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="3rem" fill="currentColor" class="bi bi-x"
                viewBox="0 0 16 16">
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
        </button>
    </div>
    <div class="b-item action">
        1
        <button class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="3rem" fill="currentColor" class="bi bi-x"
                viewBox="0 0 16 16">
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
        </button>
    </div>
</template>

<style>
.b-nav .b-content .b-item {
    width: 4rem;
    height: 4rem;
    border-radius: 9px;
    /* background-color: red; */
    font-size: 2.5rem;
    padding-top: .3rem;
    padding-bottom: .3rem;
}

.b-nav .b-content .b-item button {
    display: none;
    padding: 0;
    margin: 0;
}

.b-nav .b-content .b-item:hover button {
    display: block;
}

.b-nav .b-content .b-item:hover {
    width: 6rem;
    display: flex;
    justify-content: center;
}


.b-item.step {
    background-color: yellow;

}

.b-item.action {
    background-color: red;
}
</style>

<script>
export default{
    data(){

    },
    props:{

    },
    methods:{
        
    }
}
</script>