<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-toolbar color="blue darken-2" dark>
                        <v-btn icon @click="backRoute">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-toolbar-title>Слайдеры</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon :to="{ name: 'slider_create' }" >
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-list two-line>
                            <template v-for="item in sliders">
                                <v-list-tile avatar  v-bind:key="item.title" :to="{name: 'slider_edit', params: { id: item.id }}">
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.created_at"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                sliders:{}
            };
        },
        created: function () {
            this.getSliders();
        },
        methods: {

            getSliders(){
                this.axios.get('/api/sliders').then((response) => {
                    this.sliders = response.data;
                    console.log(this.sliders);
                });
            },
            backRoute(){
                this.$router.go(-1)
            }

        }
    }
</script>