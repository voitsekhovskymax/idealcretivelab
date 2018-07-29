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
                        <v-toolbar-title>Посетители сайта</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-list two-line>
                            <template v-for="item in visitors">
                                <v-list-tile avatar  v-bind:key="item.name" :to="{name: 'visitor_edit', params: { id: item.id }}">
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.name"></v-list-tile-title>
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
                visitors:{}
            };
        },
        created: function () {
            this.getVisitors();
        },
        methods: {
            getVisitors(){
                this.axios.get('/api/visitors').then((response) => {
                    this.visitors = response.data;
                });
            },
            backRoute(){
                this.$router.go(-1)
            }

        }
    }
</script>