import  {mapGetters,mapActions} from  "vuex"

export const  miniPlayerShow ={
    computed:{
      ...mapGetters([
        'fullScreen'
      ])
    },
    mounted() {
      this.handlePlaylist(this.fullScreen)
    },
    activated() {
      this.handlePlaylist(this.fullScreen)
    },
    watch: {
      fullScreen(newVal) {
        this.handlePlaylist(newVal)
      }
    },
    methods: {
      handlePlaylist() {
        throw new Error('component must implement handlePlaylist method')
      }
    }
}
export const playerMixin={
	computed:{
		...mapGetters([
			'favoriteList'
		])
    },
	methods:{
		toggleFavorite(song){
			if(this.isFavorite(song)){
				this.deleteFavoriteList(song)
			}else{
				this.saveFavoriteList(song)
			}
		},
		toggleFavoriteIcon(song){
			if(this.isFavorite(song)){
				return "icon-favorite"
			}else{	
				return "icon-not-favorite"
			}
		},
		isFavorite(song){
		     const index = this.favoriteList.findIndex((item) => {
		        return item.id === song.id
		     })
			return index>-1;
		},
		...mapActions([
	      'saveFavoriteList',
	      'deleteFavoriteList'
	    ])
	}
}