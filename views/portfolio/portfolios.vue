<template>
    <v-container>
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Портфолио</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon :to="{ name: 'Portfolio_Create' }">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-list two-line>
                    <template v-for="item in portfolios.data">
                        <v-list-tile avatar :to="{name: 'portfolio_edit', params: { id: item.id }}">
                            <v-list-tile-avatar>
                                <img v-bind:src="item.img">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.updated_at"></v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-action>
                                {{item.lang}}
                            </v-list-action>
                        </v-list-tile>
                    </template>
                </v-list>
                <div class="pagination" v-if="portfolios.total > portfolios.per_page">
                    <div class="pagination__left">
                        <v-btn flat icon color="green" v-if="portfolios.prev_page_url != null"
                               @click.prevent="getPortfolios(portfolios.prev_page_url)">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </div>
                    <div class="pagination__right">
                        <v-btn flat icon color="green" v-if="portfolios.next_page_url != null"
                               @click.prevent="getPortfolios(portfolios.next_page_url)">
                            <v-icon>chevron_right</v-icon>
                        </v-btn>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                portfolios: {}
            };
        },
        created: function () {

            this.getPortfolios('/api/portfolios');
        },
        methods: {

            getPortfolios(uri) {
                this.axios.get(uri).then((response) => {
                    this.portfolios = response.data;
                    console.log(this.portfolios);
                });
            },
            backRoute() {
                this.$router.go(-1)
            }

        }
    }
</script>