<?php
/*	Template Name: Página Cheia
 * 
 * */

?>

<?php get_header(); ?>

<div class="row">
	
	<div class="col-md-12">
		<?php if (have_posts()): while(have_posts()) : the_post(); ?>
			<h1><?php the_title(); ?></h1>
			<div class="entry-content">
				<?php the_content(); ?>
			</div>			
			<?php endwhile; else: ?>
				<p><?php _e('Desculpe, não há posts a exibir.'); ?></p>
			<?php endif; ?>
	</div>
	
</div>        
    
    <br>                    
<?php get_footer(); ?>
