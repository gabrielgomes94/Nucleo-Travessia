<?php
/*	Template Name: Página Geral
 * 
 * 
 * */
	get_header(); ?>

<div class="row">
	<div class="col-md-8">
		<?php if (have_posts()): while(have_posts()) : the_post(); ?>
			<h1><?php the_title(); ?></h1>
			<div class="entry-content">
				<?php the_content(); ?>
			</div>			
			<?php endwhile; else: ?>
				<p><?php _e('Desculpe, não há posts a exibir.'); ?></p>
			<?php endif; ?>
	</div>
	<div class="col-md-4">	
		<!-- Aqui virá a barra lateral -->
		<?php if ( is_sidebar_active('widget-sidebar2-area-5') ) : ?>
			<div id="secondary" class="sidebar">
				<?php dynamic_sidebar('widget-sidebar2-area-5'); ?>
			</div><!-- #terceira .widget-area -->
		<?php endif; ?> 
	</div>
	
</div>        
    
    <br>                    
<?php get_footer(); ?>

