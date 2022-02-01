<?php //子テーマ用関数
if (!defined("ABSPATH")) {
	exit();
}

//子テーマ用のビジュアルエディタースタイルを適用
add_editor_style();

//以下に子テーマ用の関数を書く
// function custom_enqueue_scripts()
// {
// 	if (!is_admin()) {
// 		//管理画面以外
// 		wp_enqueue_script("jquery");
// 		remove_action("wp_head", "wp_print_scripts");
// 		remove_action("wp_head", "wp_print_head_scripts", 9);
// 		remove_action("wp_head", "wp_enqueue_scripts", 1);
// 		add_action("wp_footer", "wp_print_scripts");
// 		add_action("wp_footer", "wp_print_head_scripts");
// 		add_action("wp_footer", "wp_enqueue_scripts");
// 	}
// }
// add_action("wp_enqueue_scripts", "custom_enqueue_scripts");