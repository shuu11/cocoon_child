<?php //子テーマ用関数
if ( !defined( 'ABSPATH' ) ) exit;

//子テーマ用のビジュアルエディタースタイルを適用
add_editor_style();

//以下に子テーマ用の関数を書く
// webp許可
function custom_mime_types( $mimes ) {
    $mimes['webp'] = 'image/webp';
    return $mimes;
}
add_filter( 'upload_mimes', 'custom_mime_types' );

	// メディアでWebP画像サムネイル表示
    function webp_is_displayable($result, $path) {
        if ($result === false) {
            $displayable_image_types = array( IMAGETYPE_WEBP );
            $info = @getimagesize( $path );
     
            if (empty($info)) {
                $result = false;
            } elseif (!in_array($info[2], $displayable_image_types)) {
                $result = false;
            } else {
                $result = true;
            }
        }
        return $result;
    }
    add_filter('file_is_displayable_image', 'webp_is_displayable', 10, 2);



// if ( !function_exists( 'is_footer_javascript_enable' ) ):
//     function is_footer_javascript_enable(){
//       return true;//get_theme_option(OP_FOOTER_JAVASCRIPT_ENABLE, 1);
//     }
// endif;

//サイトフォントソースフォントウェイト（太さ）の取得
if ( !function_exists( 'get_site_font_source_weight' ) ):
    function get_site_font_source_weight(){
      switch (get_site_font_family()) {
        case 'noto_sans_jp':
          //$font_source_weight = ':100,300,400,500,700,900';
          $font_source_weight = ':400,700';
          break;
        case 'noto_serif_jp':
          $font_source_weight = ':200,300,400,500,600,700,900';
          break;
        case 'mplus_1p':
          $font_source_weight = ':100,300,400,500,700,800,900';
          break;
        case 'rounded_mplus_1c':
          $font_source_weight = ':100,300,400,500,700,800,900';
          break;
        case 'kosugi':
          $font_source_weight = '';
          break;
        case 'kosugi_maru':
          $font_source_weight = '';
          break;
        case 'sawarabi_gothic':
          $font_source_weight = '';
          break;
        case 'sawarabi_mincho':
          $font_source_weight = '';
          break;
        default:
        $font_source_weight = null;
          break;
      }
      return $font_source_weight;
    }
endif;

function adds_footer() {
  echo "<script async src='https://www.googletagmanager.com/gtag/js?id=G-TSB05604LS'></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TSB05604LS');
</script>
";
}
add_action('wp_footer', 'adds_footer', 0);

function custom_enqueue_scripts(){
  if(!is_admin()){ //管理画面以外
    wp_enqueue_script('jquery');
      remove_action('wp_head', 'wp_print_scripts');
      remove_action('wp_head', 'wp_print_head_scripts', 9);
      remove_action('wp_head', 'wp_enqueue_scripts', 1);
      add_action('wp_footer', 'wp_print_scripts');
      add_action('wp_footer', 'wp_print_head_scripts');
      add_action('wp_footer', 'wp_enqueue_scripts');
  }
}
add_action('wp_enqueue_scripts', 'custom_enqueue_scripts');