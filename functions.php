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

//jsにasync属性を付与（ページ読み込みスピードアップ対策）
if (!(is_admin() )) {
  function add_async_to_enqueue_script( $url ) {
  if ( FALSE === strpos( $url, '.js' ) ) return $url;
  if ( strpos( $url, 'jquery.js' ) ) return $url;       //対象外
  if ( strpos( $url, 'jquery.min.js' ) ) return $url;
  return "$url' async charset='UTF-8";        // async属性を付与
}
add_filter( 'clean_url', 'add_async_to_enqueue_script', 11, 1 );
}

if ( !function_exists( 'is_footer_javascript_enable' ) ):
    function is_footer_javascript_enable(){
      return true;//get_theme_option(OP_FOOTER_JAVASCRIPT_ENABLE, 1);
    }
endif;

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
    