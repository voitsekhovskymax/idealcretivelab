<template>
    <v-container>
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Редактирование портфолио</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogDeletePortfolio = !dialogDeletePortfolio">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xl8 lg8 md8 sm12 xs12>
                        <v-card class="pa-0 mt-2">
                            <v-card-text class="pa-0 mt-2">
                                <v-flex xs12>
                                    <div class="imgpost">
                                        <img id="urlIMG" :src="portfolio.img" alt="" @click="imgPost">
                                    </div>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex xs12>
                                    <v-text-field v-model="portfolio.title" label="Заголовок поста" full-width
                                                  hide-details></v-text-field>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex xs12>
                                    <v-text-field v-model="portfolio.description" label="Описание портфолио" full-width
                                                  hide-details multi-line></v-text-field>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex xs12>
                                    <tinymce id="note"
                                             v-model="portfolio.content"
                                             toolbar1="' formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat'"
                                             toolbar2="' fullscreen | advlist autolink lists link image charmap  preview hr anchor pagebreak | searchreplace wordcount visualblocks visualchars code  | insertdatetime media nonbreaking  table contextmenu directionality | template paste textcolor colorpicker textpattern imagetools toc help  hr'">
                                    </tinymce>
                                </v-flex>

                            </v-card-text>

                        </v-card>
                        <div v-if="portfolio.feedback != null">
                            <div class="feedback" v-for=" item in portfolio.feedback">
                                <div class="name">{{item.name}}</div>
                                <div class="title">{{item.title}}</div>
                                <div class="content">{{item.content}}</div>
                            </div>
                        </div>
                    </v-flex>
                    <v-flex xl4 lg4 md4 sm12 xs12>
                        <v-card>
                            <v-card-text>
                                <v-flex xs12>
                                    <v-tooltip bottom>
                                        <a :href="'/'+portfolio.lang + '/portfolio/' + portfolio.url" target="_blank"
                                           slot="activator"
                                           style="opacity: 1">Посмотреть на сайте </a>
                                        <span>Количество просмотров : <b>{{views}}</b> </span>
                                    </v-tooltip>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex xs12>
                                    <v-select
                                            :items="languages"
                                            item-text="name"
                                            item-value="short_name"
                                            v-model="portfolio.lang"
                                            chips
                                            label="Язык портфолио"
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
                                <v-flex xs12>
                                    <v-select
                                            :items="skills"
                                            item-text="title"
                                            item-value="title"
                                            v-model="portfolio.skills"
                                            chips
                                            multiple
                                            label="Скиллы"
                                            max-height="auto"
                                            autocomplete
                                    >
                                        <template slot="selection" slot-scope="data">
                                            <v-chip
                                                    close
                                                    @input="data.parent.selectItem(data.item)"
                                                    :selected="data.selected"
                                                    class="chip--select-multi"
                                                    :key="JSON.stringify(data.item)"
                                            >
                                                <v-avatar>
                                                    <img :src="data.item.img">
                                                </v-avatar>
                                                {{ data.item.title }}
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
                                                    <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </template>
                                        </template>
                                    </v-select>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex xs12>
                                    <v-select
                                            v-model="portfolio.tags"
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
                                    <v-select
                                            :items="categories"
                                            item-text="title"
                                            item-value="title"
                                            v-model="portfolio.category"
                                            label="Категория портфолио"
                                            combobox
                                            chips
                                            autocomplete
                                    ></v-select>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex xs12>
                                    <v-text-field v-model="portfolio.seo_title" label="SEO title" hint="от 10 символов"
                                                  full-width></v-text-field>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex xs12>
                                    <v-text-field v-model="portfolio.seo_keywords" label="SEO keywords"
                                                  hint="Перечислите SEO-ключи через запятую" full-width></v-text-field>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex xs12>
                                    <v-text-field v-model="portfolio.seo_description" label="SEO description"
                                                  hint="SEO описание поста. от 15 слов" multi-line
                                                  full-width></v-text-field>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex xs12>
                                    <v-btn color="success" @click="submit">Сохранить</v-btn>
                                </v-flex>
                            </v-card-text>

                        </v-card>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
        <!--MODALS -->
        <v-dialog v-model="dialogDeletePortfolio" max-width="500px">
            <v-card>
                <v-card-text>
                    <v-flex sm12>
                        Вы действительно хотите удалить портфолио <b>{{portfolio.title}} ?</b>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="deletePortfolio">Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>

</template>

<script>
    export default {
        data() {
            return {
                portfolio: {},
                date_post_modal: false,
                time_post_modal: false,
                skills: [],
                tags: [],
                select: [],
                dialogDeletePortfolio: false,
                views: 0,
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
            this.getPortfolio();
            this.getTags();
            this.getSkills();
            this.getCategories();
        },
        methods: {
            init() {

            },
            getCategories() {
                this.axios.get('/api/portfolio_categories').then((response) => {
                    this.categories = response.data;
                }).catch(function (error) {

                });
            },
            getSkills() {
                this.axios.get('/api/skills').then((response) => {
                    this.skills = response.data;
                    console.log(this.skills);
                }).catch(function (error) {

                });
            },
            getTags() {
                this.axios.get('/api/tags').then((response) => {
                    this.tags = response.data;

                }).catch(function (error) {

                });
            },
            getPortfolio() {
                let uri = '/api/portfolios/' + this.$route.params.id + '/edit';
                this.axios.get(uri).then((response) => {
                    this.portfolio = response.data;

                    this.axios.get('/api/portfolio_get_count/' + this.portfolio.id).then((response) => {
                        this.views = response.data;
                    });
                }).catch(function (error) {
                });


            },
            deletePortfolio() {
                this.axios.delete('/api/portfolios/' + this.$route.params.id).then((response) => {
                    this.$notify({
                        group: 'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Пост удален!'
                    });
                    this.$router.push({name: 'Portfolio'});
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
                this.portfolio.img = document.getElementById("urlIMG").src;
                console.log(this.portfolio);
                this.axios.patch('/api/portfolios/' + this.$route.params.id, this.portfolio).then((response) => {
                    this.$notify({
                        group: 'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Новый пост создан!'
                    });
                    this.$router.push({name: 'Portfolio'});
                }).catch(function (error) {
                    console.log();
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

    .tooltip {
        opacity: 1 !important;
    }

    .feedback {
        background: white;
        box-shadow: 0 0 5px #ccc;
        margin: 15px 0;
        padding: 15px;
        text-align: left;
    }

    .feedback .name {
        font-size: 2em;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
    }

    .feedback .title {
        font-size: 1.5em !important;
        font-weight: 600 !important;
        letter-spacing: 1px !important;
    }

    .feedback .content {
        font-size: 1.2em;
        margin: 15px 0px;
    }

</style>