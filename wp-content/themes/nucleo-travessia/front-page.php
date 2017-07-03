<?php get_header(); ?>
</div>

<?php if(have_posts()): while(have_posts()) : the_post(); ?>

	<div class="entry-content inicial">
		<?php the_content(); ?>
		
	</div>

<?php endwhile; else: ?>
		<p><?php _e('Desculpe, não há posts a exibir.'); ?></p>
<?php endif; ?>            
                            
<?php get_footer(); ?>
