<?php get_header(); ?>

<div class="row">
	<div class="col-md-8 posts">
		<h1>Notícias</h1>				
		<br>
		<?php if (have_posts()): while(have_posts()) : the_post(); ?>
			<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
			<p><em><?php echo ucfirst(get_the_time('l, j \d\e F \d\e Y')); ?></em></p>			
			<div class="entry-content posts-resumo">
				<?php if ( has_post_thumbnail() ) : ?>
					<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
					<img src="<?php the_post_thumbnail_url(); ?>" width="100%"/>
					</a>
				<?php endif; ?>
				<hr>
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
<?php get_footer(); ?>
