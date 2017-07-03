<?php
/*
Template Name: Display Authors
*/


// Get all users order by amount of posts
$allUsers = get_users('orderby=display_name&order=ASC');

$users = array();

// Remove subscribers from the list as they won't write any articles
foreach($allUsers as $currentUser)
{	
	if(!in_array( 'subscriber', $currentUser->roles ))
	{
		$users[] = $currentUser;
	}
}

?>

<?php get_header(); ?>

<section class="content" role="main">	
		
		<h1 style="text-align: center;">Pesquisadores</h1><br>
		<?php
		$doutores[] = array();
		$doutorandos[] = array();
		$mestres[] = array();
		$mestrandos[] = array();
		$graduandos[] = array();
		$nenhum[] = array();
		foreach($allUsers as $user){
			if($user->nao_mostrar_perfil!='true'){
				include("display-author-view.php");
			}
		}
		?> 
		
</section>

<?php get_footer(); ?>
