<?php
function scripts_do_template() {
    // Bootstrap core JavaScript
    // Se preferir utilizar a própria cópia do Bootstrap, descomente a linha a seguir e comente a próxima
    //wp_register_script('bootstrap', get_template_directory_uri().'/lib/bootstrap/3.3.5/js/bootstrap.min.js', array('jquery'));
    wp_register_script('bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js', array('jquery'));

    wp_enqueue_script('jquery');
    wp_enqueue_script('bootstrap');
}

add_action('wp_enqueue_scripts', 'scripts_do_template');

if (function_exists('register_sidebar')) {
    register_sidebar(array(		
        'before_title' => '<h3>',
        'after_title' => '</h3>',
        'before_widget' => '<div class="row"><div class="col-md-12">',
        'after_widget' => '</div></div><br>',
    ));
}


function contributors() {
    global $wpdb;

    $authors = $wpdb->get_results("SELECT ID, user_nicename from $wpdb->users WHERE
display_name <> 'admin' ORDER BY display_name");

    foreach($authors as $author) {
    echo '<div class="autor">';
    echo "<a href=\"".get_bloginfo('url')."/?author=";
    echo $author->ID;
    echo "\">";
    echo get_avatar($author->ID, '150');
    echo "</a>";
     echo "<a class='name-designer' href=\"".get_bloginfo('url')."/?author=";
    echo $author->ID;
    echo "\">";
    the_author_meta('display_name', $author->ID);
    echo "</a>";
    echo "</div>";
    }
}

?>

<?php
// CAMPOS DE PERFIL PERSONALIZADOS
add_action( 'show_user_profile', 'my_show_extra_profile_fields' );
add_action( 'edit_user_profile', 'my_show_extra_profile_fields' );
 
function my_show_extra_profile_fields( $user ) { ?> 
	<h3>Mostrar Email publicamente?</h3> 
	<table class="form-table">
		<tr>
			<th><label for="mostrar_email">Mostrar Email publicamente?</label></th>
			<td>
				<input type="checkbox" name="mostrar_email" id="mostrar_email" value="true"
					<?php if ( 'true' == $user->mostrar_email ) echo 'checked'; ?>
				>
				
			</td>
		</tr>
	</table>
	
	<h3>Não mostrar Perfil do usuário na página de equipe?</h3> 
	<table class="form-table">
		<tr>
			<th><label for="mostrar_email">Marque esta opção caso queira que as informações de perfil não sejam mostradas publicamente</label></th>
			<td>
				<input type="checkbox" name="nao_mostrar_perfil" id="nao_mostrar_perfil" value="true"
					<?php if ( 'true' == $user->nao_mostrar_perfil ) echo 'checked'; ?>
				>
				
			</td>
		</tr>
	</table>
 
	<h3>Currículo Lattes</h3>
	<table class="form-table">
		<tr>
			<th><label for="lattes">Lattes</label></th>
			<td>
				<input type="text" name="lattes_profile" id="lattes_profile" 
					value="<?php echo esc_attr( get_the_author_meta( 'lattes_profile', $user->ID ) ); ?>" 
					class="regular-text" /><br />
                <span class="description">O endereço do seu currículo Lattes</span>
			</td>
		</tr>
	</table>
 
    <h3>Redes sociais</h3>
    <table class="form-table"> 
        <tr>
            <th><label for="twitter">Twitter</label></th>
            <td>
                <input type="text" name="twitter_profile" id="twitter_profile" 
					value="<?php echo esc_attr( get_the_author_meta( 'twitter_profile', $user->ID ) ); ?>" 
					class="regular-text" /><br />
                <span class="description">O seu perfil no Twitter (URL)</span>
            </td>
        </tr>
 
        <tr>
            <th><label for="facebook">Facebook</label></th>
            <td>
                <input type="text" name="facebook_profile" id="facebook_profile" 
					value="<?php echo esc_attr( get_the_author_meta( 'facebook_profile', $user->ID ) ); ?>" 
					class="regular-text" /><br />
                <span class="description">O seu perfil no Facebook (URL)</span>
            </td>
        </tr>     
        <tr>
			<th><label for="google">Google +</label></th>
			<td>
				<input type="text" name="google_profile" id="google_profile"
					value="<?php echo esc_attr( get_the_author_meta( 'google_profile', $user->ID ) ); ?>" 
					class="regular-text" /><br />
				<span class="description">O seu perfil no Google Plus (URL)</span>
			</td>               
        </tr>
        <tr>
			<th><label for="linkedin">Linked In</label></th>
			<td>
				<input type="text" name="linkedin_profile" id="linkedin_profile"
					value="<?php echo esc_attr( get_the_author_meta( 'linkedin_profile', $user->ID ) ); ?>" 
					class="regular-text" /><br />
				<span class="description">O seu perfil no LinkedIn (URL)</span>
			</td>               
        </tr>     
    </table>
    <table class="form-table">
		<h3>Titulo</h3>
		<tr>
			<th><label for="mostrar_email">Doutor(a)</label></th>
			<td>
				<input type="radio" name="titulo" id="titulo" value="doutor"
					<?php if ( 'doutor' == $user->titulo ) echo 'checked'; ?>
				>				
			</td>
		</tr>
		<tr>
			<th><label for="mostrar_email">Doutorando(a)</label></th>
			<td>
				<input type="radio" name="titulo" id="titulo" value="doutorando"
					<?php if ( 'doutorando' == $user->titulo ) echo 'checked'; ?>
				>				
			</td>
		</tr>
		<tr>
			<th><label for="mostrar_email">Mestre(a)</label></th>
			<td>
				<input type="radio" name="titulo" id="titulo" value="mestre"
					<?php if ( 'mestre' == $user->titulo ) echo 'checked'; ?>
				>				
			</td>
		</tr>
		<tr>
			<th><label for="mostrar_email">Mestrando(a)</label></th>
			<td>
				<input type="radio" name="titulo" id="titulo" value="mestrando"
					<?php if ( 'mestrando' == $user->titulo ) echo 'checked'; ?>
				>				
			</td>
		</tr>
		<tr>
			<th><label for="mostrar_email">Graduando(a)</label></th>
			<td>
				<input type="radio" name="titulo" id="titulo" value="graduando"
					<?php if ( 'graduando' == $user->titulo ) echo 'checked'; ?>
				>				
			</td>
		</tr>
		<tr>
			<th><label for="mostrar_email">Nenhum</label></th>
			<td>
				<input type="radio" name="titulo" id="titulo" value="nenhum"
					<?php if ( 'graduando' == $user->titulo ) echo 'checked'; ?>
				>				
			</td>
		</tr>
    </table>
<?php } ?>

<?php
// GUARDAR E MANTER INFO DOS CAMPOS
add_action( 'personal_options_update', 'my_save_extra_profile_fields' );
add_action( 'edit_user_profile_update', 'my_save_extra_profile_fields' );
 
function my_save_extra_profile_fields( $user_id ) {
 
    if ( !current_user_can( 'edit_user', $user_id ) )
        return false;
	update_usermeta( $user_id, 'lattes_profile', $_POST['lattes_profile'] );
    update_usermeta( $user_id, 'twitter_profile', $_POST['twitter_profile'] );
    update_usermeta( $user_id, 'facebook_profile', $_POST['facebook_profile'] );
    update_usermeta( $user_id, 'google_profile', $_POST['google_profile'] );
    update_usermeta( $user_id, 'linkedin_profile', $_POST['linkedin_profile'] );
    update_usermeta( $user_id, 'mostrar_email', $_POST['mostrar_email'] );
    update_usermeta( $user_id, 'nao_mostrar_perfil', $_POST['nao_mostrar_perfil'] );
    update_usermeta( $user_id, 'titulo', $_POST['titulo'] );    
}

/**
 * Filter the except length to 20 characters.
 *
 * @param int $length Excerpt length.
 * @return int (Maybe) modified excerpt length.
 */
function wpdocs_custom_excerpt_length( $length ) {
    return 200;
}
add_filter( 'excerpt_length', 'wpdocs_custom_excerpt_length', 999 );

/**
 * Filter the "read more" excerpt string link to the post.
 *
 * @param string $more "Read more" excerpt string.
 * @return string (Maybe) modified "read more" excerpt string.
 */
function wpdocs_excerpt_more( $more ) {
    return sprintf( '<a class="leia-mais" href="%1$s">%2$s</a>',
        get_permalink( get_the_ID() ),
        __( ' Leia mais...', 'textdomain' )
    );
}
add_filter( 'excerpt_more', 'wpdocs_excerpt_more' );

add_theme_support( 'post-thumbnails' ); 


// Retorna outras categorias excepto a atual (redundante)
function cats_meow($glue) {
	$current_cat = single_cat_title( '', false );
	$separator = "\n";
	$cats = explode( $separator, get_the_category_list($separator) );
	foreach ( $cats as $i => $str ) {
		if ( strstr( $str, ">$current_cat<" ) ) {
			unset($cats[$i]);
			break;
		}
	}if ( empty($cats)) return false;
	return trim(join( $glue, $cats ));
} // end cats_meow


// Retorna outras tags excepto a atual (redundante)
function tag_ur_it($glue) {
 $current_tag = single_tag_title( '', '',  false );
 $separator = "\n";
 $tags = explode( $separator, get_the_tag_list( "", "$separator", "" ) );
 foreach ( $tags as $i => $str ) {
  if ( strstr( $str, ">$current_tag<" ) ) {
   unset($tags[$i]);
   break;
  }
 }
 if ( empty($tags) )
  return false;
 
 return trim(join( $glue, $tags ));
} // end tag_ur_it

// Registrar áreas de widgets
function theme_widgets_init() {
 // Área 1
 register_sidebar( array (
 'name' => 'Area 1 - Footer Widget',
 'id' => 'widget-footer-area-1',
 'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
 'after_widget' => '</div>',
 'before_title' => '<h3 class="widget-title">',
 'after_title' => '</h3><hr>',
  ) );
 
 // Área 2
 register_sidebar( array (
 'name' => 'Area 2 - Footer Widget',
 'id' => 'widget-footer-area-2',
 'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
 'after_widget' => '</div>',
 'before_title' => '<h3 class="widget-title">',
 'after_title' => '</h3><hr>',
  ) );
  
  // Área 3
 register_sidebar( array (
 'name' => 'Area 3 - Footer Widget',
 'id' => 'widget-footer-area-3',
 'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
 'after_widget' => '</div>',
 'before_title' => '<h3 class="widget-title">',
 'after_title' => '</h3><hr>',
  ) );
  
  // Área 4
 register_sidebar( array (
 'name' => 'Area 4 - Footer Widget',
 'id' => 'widget-footer-area-4',
 'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
 'after_widget' => '</div>',
 'before_title' => '<h3 class="widget-title">',
 'after_title' => '</h3><hr>',
  ) );
  // Área 5
 register_sidebar( array (
 'name' => 'Area 5 - Sidebar 2 Widget',
 'id' => 'widget-sidebar2-area-5',
 'before_widget' => '<div id="%1$s" class="sidebar-body sidebar %2$s">',
 'after_widget' => '</div>',
 'before_title' => '<h3 class="sidebar-title">',
 'after_title' => '</h3>',
  ) );
  
} // end theme_widgets_init
 
add_action( 'init', 'theme_widgets_init' );

// Verificar widgets nas áreas de widgets
function is_sidebar_active( $index ){
  global $wp_registered_sidebars;
 
  $widgetcolums = wp_get_sidebars_widgets();
 
  if ($widgetcolums[$index]) return true;
 
 return false;
} // end is_sidebar_active

/* Theme setup */
add_action( 'after_setup_theme', 'wpt_setup' );
    if ( ! function_exists( 'wpt_setup' ) ):
        function wpt_setup() {  
            register_nav_menu( 'primary', __( 'Primary navigation', 'wptuts' ) );
        } endif;

function wpt_register_js() {
    wp_register_script('jquery.bootstrap.min', get_template_directory_uri() . '/js/bootstrap.min.js', 'jquery');
    wp_enqueue_script('jquery.bootstrap.min');
}
add_action( 'init', 'wpt_register_js' );
function wpt_register_css() {
    wp_register_style( 'bootstrap.min', get_template_directory_uri() . '/css/bootstrap.min.css' );
    wp_enqueue_style( 'bootstrap.min' );
}
add_action( 'wp_enqueue_scripts', 'wpt_register_css' );

require_once('wp_bootstrap_navwalker.php');

$args = array(
	'width'         => 1880,
	'height'        => 300,
	'default-image' => get_template_directory_uri() . '/img/logo.jpg',
	'uploads'       => true,
);
add_theme_support( 'custom-header', $args );




?>




