<?php
$pmrequests = new PM_request;
$options = maybe_unserialize($row->group_options);
if(!empty($options) && isset($options['is_hide_group_card']) && $options['is_hide_group_card']==1)
{
    $show_group_card =0;
}else 
{ $show_group_card =1;}
?>
<div class="pmagic">
    <?php if($show_group_card==1):?>
       <div class="pm-group-card-box pm-dbfl pm-border-bt">
         <div class="pm-group-card pm-dbfl pm-border pm-bg pm-radius5">
            <div class="pm-group-title pm-dbfl pm-bg-lt pm-pad10 pm-border-bt">
            <i class="fa fa-users" aria-hidden="true"></i>
			<?php echo $row->group_name;?>
            <?php 
			$profile_url = $pmrequests->profile_magic_get_frontend_url('pm_user_profile_page','');
			$profile_url = add_query_arg( 'uid',$group_leader,$profile_url );
			if(is_user_logged_in() && $group_leader==$current_user->ID):
			$edit_group = $pmrequests->profile_magic_get_frontend_url('pm_group_page','');
			$edit_group = add_query_arg( 'gid',$gid,$edit_group );
			$edit_group = add_query_arg( 'edit','1',$edit_group );
			?>
           <div class="pm-edit-group"><a href="<?php echo $edit_group;?>" class="pm_button"><?php _e('Edit','profile-grid');?></a></div>
            <?php endif;?>
            </div>
             <div class="pm-group-image pm-difl pm-border">
                  <?php echo $pmrequests->profile_magic_get_group_icon($row); ?>
             </div>
             <div class="pm-group-description pm-difl pm-bg pm-pad10 pm-border">
         
         		<?php if(isset($group_leader) && $group_leader!=false && $pagenum==1):?>
                <div class="pm-card-row pm-dbfl">
                    <div class="pm-card-label pm-difl">Leader</div>
                    <div class="pm-card-value pm-difl pm-group-leader-small pm-difl">
                         <a href="<?php echo $profile_url ;?>"><?php echo $pmrequests->profile_magic_get_user_field_value($group_leader,'user_login');?> </a>
                <?php echo get_avatar($group_leader,16,'',false,array('class'=>'pm-infl'));?>
            
                        </div>
                 </div>
        		<?php endif; ?>
         
         
                 
                 
                 <div class="pm-card-row pm-dbfl">
                    <div class="pm-card-label pm-difl"><?php _e('Members','profile-grid');?></div>
                    <div class="pm-card-value pm-difl"><?php echo $total_users?></div>
                 </div>
                 
                 <?php /*?><div class="pm-card-row pm-blfl">
                    <div class="pm-card-label pm-infl">Formed</div>
                    <div class="pm-card-value pm-infl">24th July, 1144</div>
                 </div><?php */?>
                 
                  <div class="pm-card-row pm-dbfl">
                    <div class="pm-card-label pm-difl"><?php _e('Details','profile-grid');?></div>
                    <div class="pm-card-value pm-difl"><?php echo $row->group_desc;?></div>
                 </div>
                 
             </div>
           </div>
        </div>
    <?php endif;?>
     
<?php
        $pmhtmlcreator = new PM_HTML_Creator($this->profile_magic,$this->version);
        if(!empty($users))
        {
            foreach($users as $user) 
            {

                     $pmhtmlcreator->get_group_page_fields_html($user->ID,$gid,$group_leader,150,array('class'=>'user-profile-image'));
            }
        }
        else
        {
            _e('No User Profile is registered in this Group','profile-grid');
        }
	
	echo '<div class="pm_clear"></div>'.$pagination;
	

?>
    </div>
