</div> <!-- /container -->
            <footer>
				
				<div class="row rodape">					
					<br>
						<div class="col-sm-3">				
							<?php if ( is_sidebar_active('widget-footer-area-1') ) : ?>
							  <div id="primary" class="widget-area">
							   <ul class="xoxo">
								<?php dynamic_sidebar('widget-footer-area-1'); ?>
							   </ul>
							  </div><!-- #primeira .widget-area -->
							<?php endif; ?>
						</div>
						<div class="col-sm-3">
							<?php if ( is_sidebar_active('widget-footer-area-2') ) : ?>
							  <div id="secondary" class="widget-area">
							   <ul class="xoxo">
								<?php dynamic_sidebar('widget-footer-area-2'); ?>
							   </ul>
							  </div><!-- #segunda .widget-area -->
							<?php endif; ?>
						</div>
						<div class="col-sm-3">
							<?php if ( is_sidebar_active('widget-footer-area-3') ) : ?>
							  <div id="secondary" class="widget-area">
							   <ul class="xoxo">
								<?php dynamic_sidebar('widget-footer-area-3'); ?>
							   </ul>
							  </div><!-- #terceira .widget-area -->
							<?php endif; ?> 
						</div>
						<div class="col-sm-3">
							<?php if ( is_sidebar_active('widget-footer-area-4') ) : ?>
							  <div id="secondary" class="widget-area">
							   <ul class="xoxo">
								<?php dynamic_sidebar('widget-footer-area-4'); ?>
							   </ul>
							  </div><!-- #quarta .widget-area -->
							<?php endif; ?> 
						</div>
				</div>
				<div class="row rodape rodape2">
					<p class="lista-paginas-rodape">
						
						<?php wp_nav_menu( array(
				  'menu' => 'top_menu',
				  'depth' => 3,
				  'container' => false,
				  'menu_class' => 'lista-paginas-rodape',
				  //Process nav menu using our custom nav walker
				  'walker' => new wp_bootstrap_navwalker())
				); ?>
					</p> 	
					<br>
					<a href="https://www.unifei.edu.br/">
						<img src="<?php bloginfo('template_directory'); ?>/img/icons/unifei.gif" width="96px" height="96px">
					</a>
					<a href="https://www.unifei.edu.br/"><p>Universidade Federal de Itajubá</p></a>
				</div>				
			
				<?php wp_footer(); ?>				
            </footer>                    
		
    </body>
</html>
