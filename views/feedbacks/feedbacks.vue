<template>
    <v-container>
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>отзывы</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon :to="{ name: 'feedback_create' }">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-list two-line>
                    <template v-for="item in feedbacks">
                        <v-list-tile avatar :to="{name: 'feedback_update', params: { id: item.id }}">
                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                feedbacks: {}
            };
        },
        created: function () {
            this.getFeedbacks();
        },
        methods: {
            getFeedbacks() {
                this.axios.get('/api/feedbacks').then((response) => {
                    this.feedbacks = response.data;
                    console.log(this.feedbacks);
                });
            },
            backRoute() {
                this.$router.go(-1)
            }

        }
    }
</script>