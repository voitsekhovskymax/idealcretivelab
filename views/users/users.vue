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
                        <v-toolbar-title>Пользователи сайта</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-list two-line>
                            <template v-for="item in users">
                                <v-list-tile avatar  v-bind:key="item.name" :to="{name: 'user_edit', params: { id: item.id }}">
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.name"></v-list-tile-title>
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
                users:{}
            };
        },
        created: function () {
            this.getUsers();
        },
        methods: {

            getUsers(){
                this.axios.get('/api/users').then((response) => {
                    this.users = response.data;
                });
            },
            backRoute(){
                this.$router.go(-1)
            }

        }
    }
</script>