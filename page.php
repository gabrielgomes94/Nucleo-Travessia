<?php get_header(); ?>

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
		<?php get_sidebar(); ?>
	</div>
	
</div>        
    
    <br>                    
<?php get_footer(); ?>
