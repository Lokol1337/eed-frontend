<template>

    <div class="card" style="width: 18rem">

        <!-- <img class="card-img-top" alt="Card image cap" /> -->
        <div class="card-body">
            <h5 class="card-title">{{name}}</h5>
            <p class="card-text">
            {{description}}
            </p>
            <center>
            <div class="dropdown ">
                <button class="btn btn-outline dropdown-toggle w-100" type="button" id="dropdownMenuButton1" 
                style="background-color: #292c63; color: #f4f7fa;" data-bs-toggle="dropdown" aria-expanded="false">
                Треннировка
                </button>
                <ul class="dropdown-menu w-100 h-100" aria-labelledby="dropdownMenuButton1">
                <li v-for="normative in normatives" :key="normative.id">
                    <button class="btn btn-secondary w-100 h-100"
                    @click.prevent="goToPath('/p-302-o', normative.id)">{{normative.name}}</button>
                </li>
                </ul>
            </div>
            </center>

            <!-- <center>
            <div class="dropdown d-none">
                <button class="btn btn-outline dropdown-toggle w-100" type="button" id="dropdownMenuButton1" 
                style="background-color: #292c63; color: #f4f7fa;" data-bs-toggle="dropdown" aria-expanded="false">
                Экзамен
                </button>
                <ul class="dropdown-menu w-100 h-100" aria-labelledby="dropdownMenuButton1">

                <li>
                    <button class="btn btn-secondary w-100 h-100" 
                    @click.prevent="goToPath('/p-302-o',11, 0)">Приведение в первоначальное состояние</button>
                </li>
                <li><button class="btn btn-secondary w-100 h-100"  
                    @click.prevent="goToPath('/p-302-o',12, 0)">Настройка</button></li>
                <li>
                    <button class="btn btn-secondary w-100 h-100"  
                    @click.prevent="goToPath('/p-302-o',21, 0)">Настройка на себя</button>
                </li>
                
                </ul>
            </div>
            </center> -->

    </div>

    </div>
</template>

<script>

export default {
    props: {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        normatives: {
            type: Object,
        }
    },
    methods: {
        goToPath(route,norm = 0, is_training = 1) {
            this.$router.push({path: route, query: { norm: norm , it: is_training}});
        },
  },
}

</script>