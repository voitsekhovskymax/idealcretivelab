<template>
    <v-app id="inspire">
        <notifications group="info"  position="bottom right"/>
        <v-navigation-drawer  fixed clipped app v-model="drawer" >
            <v-list>
                <router-link :to="{name: 'Blog'}">
                    <v-list-tile  @click="">
                        <v-list-tile-action>
                            <v-icon >note</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title> Блог </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>
                <router-link :to="{name: 'Portfolio'}">
                    <v-list-tile  @click="">
                        <v-list-tile-action>
                            <v-icon  color="gray">star</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title> Портфолио </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>
                <router-link :to="{name: 'skills'}">
                    <v-list-tile  @click="">
                        <v-list-tile-action>
                            <v-icon  color="gray">star</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title> Скиллы </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>
                <router-link :to="{name: 'sliders'}">
                    <v-list-tile  @click="">
                        <v-list-tile-action>
                            <v-icon  color="gray">input</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title> Слайдеры </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>
                <router-link :to="{name: 'visitors'}">
                    <v-list-tile  @click="">
                        <v-list-tile-action>
                            <v-icon  color="gray">person</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title> Посетители </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>
                <router-link :to="{name: 'feedbacks'}">
                    <v-list-tile  @click="">
                        <v-list-tile-action>
                            <v-icon  color="gray">cloud_queue</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title> Отзывы </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>
                <router-link :to="{name: 'filemanager'}">
                    <v-list-tile  @click="">
                        <v-list-tile-action>
                            <v-icon  color="gray">cloud_queue</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title> Файлы </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                color="blue darken-3"
                dark
                app
                clipped-left
                fixed
        >
            <v-toolbar-title  class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <router-link :to="{name: 'Welcome'}">
                <span class="hidden-xs-only"><img src="/images/Logo-white.png" alt="IDEAL" class="logo"></span>
                </router-link>
                <a :href="'/'" target="_blank"> <v-icon>open_in_new</v-icon></a>
            </v-toolbar-title>

            <div class="d-flex align-center" style="margin-left: auto">
                <v-btn icon :to="{name: 'users'}">
                    <v-icon>person</v-icon>
                </v-btn>
                <v-btn icon :to="{name: 'notifications'}">
                    <v-icon>notifications</v-icon>
                </v-btn>
                <v-btn icon  :to="{name: 'user_settings', params: { id: auth.id }}">
                    <v-avatar size="32px" tile>
                        <img
                                :src="auth.img"
                                alt="Аватар"
                                id="avatar_user"
                                title="Пользователь"
                        >
                    </v-avatar>
                </v-btn>
            </div>
        </v-toolbar>
        <v-content>
            <v-container>
                <!--<v-container fluid>-->
                <router-view></router-view>
                <!--</v-container>-->
            </v-container>
        </v-content>

    </v-app>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            drawer: null,
            auth:{}
        }),
        props: {
            source: String
        },
        created: function(){
          this.Auth();  
        },
        methods:{
          Auth(){
              this.axios.get('/api/authuser').then((response) => {
                  this.auth = response.data;
                  // console.dir(this.auth)
              });
          }  
        }
    }
</script>


<style>
    .logo{
        max-width: 100px;
        margin-bottom: -12px;
    }
    .list__tile__title {
        color:gray;
    }
    .title {

        font-size: 20px!important;
        font-weight: 500;
        line-height: 1!important;
        letter-spacing: .02em!important;
    }
    a, a:hover, a:focus{
        text-decoration: none !important;
    }

    .avatar--tile, .avatar--tile .icon, .avatar--tile img { border-radius: 45px;}
    
</style>