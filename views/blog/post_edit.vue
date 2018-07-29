<template>
    <v-container >
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Редактирование поста</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogDeletePost = !dialogDeletePost">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-toolbar>
            <v-layout row wrap>
            <v-flex xl8 lg8 md8 sm12 xs12>
                <v-card class="pa-0 mt-2">
                    <v-card-text class="pa-0 mt-2">
                        <v-flex xs12>
                            <div class="imgpost">
                                <img id="urlIMG" :src="post.img" alt="" @click="imgPost">
                            </div>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex xs12>
                            <v-text-field v-model="post.title" label="Заголовок поста" full-width
                                          hide-details></v-text-field>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex xs12>
                            <tinymce id="note"
                                     v-model="post.content"
                                     toolbar1="' formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat'"
                                     toolbar2="' fullscreen | advlist autolink lists link image charmap  preview hr anchor pagebreak | searchreplace wordcount visualblocks visualchars code  | insertdatetime media nonbreaking  table contextmenu directionality | template paste textcolor colorpicker textpattern imagetools toc help  hr'">
                            </tinymce>
                        </v-flex>

                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xl4 lg4 md4 sm12 xs12>
                <v-card>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-tooltip bottom>
                                    <a :href="'/'+post.lang + '/blog/' + post.url" target="_blank" slot="activator"
                                       style="opacity: 1">Посмотреть на сайте </a>
                                    <span>Количество просмотров : <b>{{views}}</b> </span>
                                </v-tooltip>
                            </v-flex>
                            

                            <v-flex xs12>
                                <v-select
                                        :items="languages"
                                        item-text="name"
                                        item-value="short_name"
                                        v-model="post.lang"
                                        chips
                                        label="Язык статьи"
                                        max-height="auto"
                                >
                                    <template slot="selection" slot-scope="data">
                                        <v-chip
                                                @input="data.parent.selectItem(data.item)"
                                                :selected="data.selected"
                                                class="chip--select-multi"
                                                :key="JSON.stringify(data.item)"
                                        >
                                            <v-avatar>
                                                <img :src="data.item.img">
                                            </v-avatar>
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template slot="item" slot-scope="data">
                                        <template v-if="typeof data.item !== 'object'">
                                            <v-list-tile-content v-text="data.item"></v-list-tile-content>
                                        </template>
                                        <template v-else>
                                            <v-list-tile-avatar>
                                                <img v-bind:src="data.item.img"/>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </template>
                                </v-select>
                            </v-flex>
                            <v-flex xs6>
                                <v-dialog ref="dialog"
                                          persistent
                                          v-model="date_post_modal"
                                          lazy
                                          full-width
                                          width="300px"
                                          :return-value.sync="date_post">
                                    <v-text-field slot="activator" label="Выберите дату" v-model="date_post" prepend-icon="event" readonly ></v-text-field>
                                    <v-date-picker v-model="date_post" :first-day-of-week="1" locale="ru-ru" scrollable actions>
                                        <template slot-scope="{ save, cancel }">
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="date_post_modal = false">Закрыть</v-btn>
                                                <v-btn flat color="primary" @click="$refs.dialog.save(date_post)">Выбрать</v-btn>
                                            </v-card-actions>
                                        </template>
                                    </v-date-picker>
                                </v-dialog>
                            </v-flex>
                            <v-flex xs6>
                                <v-dialog ref="dialogtime"
                                          persistent
                                          v-model="time_post_modal"
                                          lazy
                                          full-width
                                          width="300px"
                                          :return-value.sync="time_post"
                                >
                                    <v-text-field slot="activator" label="Выберите время" v-model="time_post"  readonly ></v-text-field>
                                    <v-time-picker v-model="time_post" format="24hr"  locale="ru-ru" scrollable actions>
                                        <template slot-scope="{ save, cancel }">
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="cancel">Закрыть</v-btn>
                                                <v-btn flat color="primary" @click="$refs.dialogtime.save(time_post)">Выбрать</v-btn>
                                            </v-card-actions>
                                        </template>
                                    </v-time-picker>
                                </v-dialog>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-flex xs12>
                            <v-select
                                    :items="categories"
                                    item-text="title"
                                    item-value="title"
                                    v-model="post.category"
                                    label="Категория статьи"
                                    combobox
                                    chips
                                    autocomplete
                            ></v-select>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex xs12>
                            <v-select
                                    v-model="post.tags"
                                    label="Теги"
                                    :items="tags"
                                    chips
                                    tags
                                    multiple
                                    item-text="title"
                                    item-value="title"
                            ></v-select>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex xs12>
                            <v-text-field v-model="post.seo_title" label="SEO title" hint="от 10 символов"
                                          full-width></v-text-field>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex xs12>
                            <v-text-field v-model="post.seo_keywords" label="SEO keywords"
                                          hint="Перечислите SEO-ключи через запятую" full-width></v-text-field>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex xs12>
                            <v-text-field v-model="post.seo_description" label="SEO description"
                                          hint="SEO описание поста. от 15 слов" multi-line full-width></v-text-field>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex xs12>
                            <v-btn color="success" @click="submit">Сохранить</v-btn>
                        </v-flex>
                    </v-card-text>
                </v-card>
            </v-flex>
            </v-layout>
        </v-card>
        <!--MODALS -->
        <v-dialog v-model="dialogDeletePost" max-width="500px">
            <v-card>
                <v-card-text>
                    <v-flex sm12>
                        Вы действительно хотите удалить пост <b>{{post.title}} ?</b>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="deletePost">Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>

</template>

<script>
    export default {
        data() {
            return {
                post: {},
                date_post: '',
                time_post: '',
                date_post_modal: false,
                time_post_modal: false,
                categories: [],
                views: 0,
                tags: [],
                select: [],
                dialogDeletePost: false,
                languages: [
                    {
                        name: 'Английский',
                        img: '  /images/flags/United-Kingdom.png',
                        short_name: 'en'
                    },
                    {
                        name: 'Русский',
                        img: '  /images/flags/Russia.png',
                        short_name: 'ru'
                    },
                    {
                        name: 'Немецкий',
                        img: '  /images/flags/Germany.png',
                        short_name: 'de'
                    }
                ]
            };
        },
        created: function () {
            this.init();
            this.getTags();
            this.getCategories();
            this.getPost();

        },
        methods: {
            init() {

            },
            getCategories() {
                this.axios.get('/api/post_categories').then((response) => {
                    this.categories = response.data;
                }).catch(function (error) {

                });
            },
            getTags() {
                this.axios.get('/api/tags').then((response) => {
                    this.tags = response.data;
                }).catch(function (error) {

                });
            },
            getPost() {
                let uri = '/api/posts/' + this.$route.params.id + '/edit';
                this.axios.get(uri).then((response) => {
                    this.post = response.data;
                    let get_date_post = this.post.published_at;
                    let arr = get_date_post.split(' ');
                    this.date_post = arr[0];
                    this.time_post = arr[1];

                    this.axios.get('/api/post_get_count/' + this.post.id).then((response) => {
                        this.views = response.data;
                    });

                }).catch(function (error) {
                });


            },
            deletePost() {
                this.axios.delete('/api/posts/' + this.$route.params.id).then((response) => {
                    this.$notify({
                        group: 'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Пост удален!'
                    });
                    this.$router.push({name: 'Blog'});
                }).catch(function (error) {
                    this.$notify({
                        group: 'info',
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Удалить пост не получилось.'
                    });
                });

            },
            imgPost() {
                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file', 'FileManager', 'width=900,height=600');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById("urlIMG").src = path;

                });
            },
            submit() {
                this.post.img = document.getElementById("urlIMG").src;
                if (this.time_post.length > 5) {
                    this.post.published_at = this.date_post + ' ' + this.time_post;
                }
                else {
                    this.post.published_at = this.date_post + ' ' + this.time_post + ":00";
                }
                console.log(this.post);
                this.axios.patch('/api/posts/' + this.$route.params.id, this.post).then((response) => {
                    this.$notify({
                        group: 'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Новый пост создан!'
                    });
                    this.$router.push({name: 'Blog'});
                }).catch(function (error) {
                    this.$notify({
                        group: 'info',
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Не получилось создать новый пост..'
                    });
                });
            },
            backRoute() {
                this.$router.go(-1)
            }

        }
    };

</script>

<style>
    #urlIMG {
        max-width: 100%;
        max-height: 100%
    }

    .tooltip {
        opacity: 1 !important;
    }

    .imgpost {
        height: 100px;
        width: 100%;
        text-align: center;
        cursor: pointer
    }

    .divider {
        margin: 0px !important;
    }

    #note_ifr {
        height: 500px !important;;
    }

</style>