<template>
    <v-container>
                <v-card>
                    <v-toolbar color="blue darken-2" dark>
                        <v-btn icon @click="backRoute">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-toolbar-title>Все посты блога</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon :to="{ name: 'Post_Create' }" >
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <div class="post__container">
                            <v-list two-line>
                                <template v-for="item in posts.data" >
                                    <v-list-tile avatar   :to="{name: 'post_edit', params: { id: item.id }}">
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
                        </div>
                        <div class="pagination" v-if="posts.total > posts.per_page">
                            <div class="pagination__left">
                                <v-btn flat icon color="green"  v-if="posts.prev_page_url != null" @click.prevent="getPosts(posts.prev_page_url)">
                                    <v-icon>chevron_left</v-icon>
                                </v-btn>
                            </div>
                            <div class="pagination__right">
                                <v-btn flat icon color="green"  v-if="posts.next_page_url != null" @click.prevent="getPosts(posts.next_page_url)">
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
                posts:{},
                languages:[
                    {
                        name:'Английский',
                        img:'  /images/flags/United-Kingdom.png',
                        short_name:'en'
                    },
                    {
                        name:'Русский',
                        img:'  /images/flags/Russia.png',
                        short_name:'ru'
                    },
                    {
                        name:'Немецкий',
                        img:'  /images/flags/Germany.png',
                        short_name:'de'
                    }
                ]
            };
        },
        created: function () {
            this.getPosts('/api/posts');
        },
        methods: {
            getPosts(uri){
                this.axios.get(uri).then((response) => {
                    this.posts = response.data;
                    console.log(this.posts);
                });
            },
            backRoute(){
                this.$router.go(-1)
            },
            
        }
    }
</script>