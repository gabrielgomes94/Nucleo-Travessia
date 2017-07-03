<?php
/*
Template Name: Category
*/
get_header(); ?>


<div id="container">
	<div class="row">
		<div class="col-md-8 posts">	
			<div id="content" role="main">
			<?php the_post(); ?>  
 
			<h1 class="page-title"><?php _e( 'Categoria:', 'seu-template' ) ?> <span><?php single_cat_title() ?></span></span></h1>
    <?php $categorydesc = category_description(); if ( !empty($categorydesc) ) echo apply_filters( 'archive_meta', '<div class="archive-meta">' . $categorydesc . '</div>' ); ?>
			<?php rewind_posts(); ?>
 
			<?php global $wp_query; $total_pages = $wp_query->max_num_pages; if ( $total_pages > 1 ) { ?>
				<div id="nav-above" class="navigation">
					<div class="nav-previous">
						<?php next_posts_link(__( '<span class="meta-nav">«</span> Posts mais antigos', 'seu-template' )) ?>
					</div>
					<div class="nav-next">
						<?php previous_posts_link(__( 'Posts mais novos <span class="meta-nav">»</span>', 'seu-template' )) ?>
					</div>
				</div><!-- #nav-above -->
			<?php } ?>  
 
			<?php while ( have_posts() ) : the_post(); ?>
				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<h2 class="entry-title">
						<a href="<?php the_permalink(); ?>" title="<?php printf( __('Permalink to %s', 'seu-template'), the_title_attribute('echo=0') ); ?>" rel="bookmark"><?php the_title(); ?></a>
					</h2>
				<div class="entry-meta">
					<span class="meta-prep"><?php _e('Por ', 'seu-template'); ?></span>
					<span class="author vcard"><a class="url fn n" href="<?php echo get_author_link( false, $authordata->ID, $authordata->user_nicename ); ?>" title="<?php printf( __( 'View all posts by %s', 'seu-template' ), $authordata->display_name ); ?>"><?php the_author(); ?></a></span>
					<span class="meta-sep"> | </span>
					<span class="meta-prep meta-prep-entry-date"><?php _e('Publicado em ', 'seu-template'); ?></span>
					<span class="entry-date"><abbr class="published" title="<?php the_time('d-m-Y\TH:i:sO') ?>"><?php the_time( get_option( 'date_format' ) ); ?></abbr></span>
			<?php edit_post_link( __( 'Edite', 'seu-template' ), "<span class=\"meta-sep\">|</span>\n\t\t\t\t\t\t<span class=\"edit-link\">", "</span>\n\t\t\t\t\t" ) ?>
			</div><!-- .entry-meta -->
 
			 <div class="entry-summary">
				 <?php if ( has_post_thumbnail() ) : ?>
							<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
							<img src="<?php the_post_thumbnail_url(); ?>" width="100%"/>
							</a>
				<?php endif; ?>
				<?php the_excerpt(); ?>
				
			 </div><!-- .entry-summary -->
 
			 <div class="entry-utility">
				 <?php if ( $cats_meow = cats_meow(', ') ) : // Retorna categorias que não aquela pesquisada ?>
					  <span class="cat-links"><?php printf( __( 'Also posted in %s', 'seu-template' ), $cats_meow ) ?></span>
					  <span class="meta-sep"> | </span>
				<?php endif ?>
				 <span class="meta-sep"> | </span>
				 <?php the_tags( '<span class="tag-links"><span class="entry-utility-prep entry-utility-prep-tag-links">' . __('Tagged ', 'seu-template' ) . '</span>', ", ", "</span>\n\t\t\t\t\t\t<span class=\"meta-sep\">|</span>\n" ) ?>
				 <span class="comments-link"><?php comments_popup_link( __( 'Deixe um comentário', 'seu-template' ), __( '1 comentário', 'seu-template' ), __( '% comentários', 'seu-template' ) ) ?></span>
				 <?php edit_post_link( __( 'Edite', 'seu-template' ), "<span class=\"meta-sep\">|</span>\n\t\t\t\t\t\t<span class=\"edit-link\">", "</span>\n\t\t\t\t\t\n" ) ?>
			 </div><!-- #entry-utility -->
			 <hr>
    </div><!-- #post-<?php the_ID(); ?> -->
 
<?php endwhile; ?>  
 
				<?php include("posts-navigation.php"); ?>

			</div><!-- #content -->
		</div>
		<div class="col-md-4">
			<?php get_sidebar(); ?>
		</div>
	</div>
</div><!-- #container -->


<?php get_footer(); ?>
