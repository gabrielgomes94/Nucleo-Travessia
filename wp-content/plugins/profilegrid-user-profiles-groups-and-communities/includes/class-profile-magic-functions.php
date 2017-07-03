<?php

class Profile_Magic_Basic_Functions 
{
	
    private $profile_magic;
		
    private $version;
		

    public function __construct( $profile_magic, $version ) 
    {
        $this->profile_magic = $profile_magic;
        $this->version = $version;
    }

    public function null_field_notice() 
    {
       //echo $this->profile_magic;
         _e( 'Some of the options below require selecting fields from your form. Since you are creating new form from scratch, there are no fields in this form yet. You can come back later and modify these field specific options. You can safely ignore them for now and save the settings.','profile-grid' );
    }
    
    public function get_all_users_for_combo_box($arg=array())
    {
        $wp_users = get_users($arg);
        // Array of WP_User objects.
        if(!empty($wp_users))
        {
        foreach ( $wp_users as $user ) {
                $pm_users[] =  '"'.esc_html( $user->user_login).'"';
        }
        $all_users = implode(",",$pm_users);
        }
        else
        {
            return false;
        }
        return $all_users;
    }
	
	public function get_error_frontend_message()
    {
        $error = array();
		$error['pass_length'] = __('Your password should be at least 7 characters long.','profile-grid');
		$error['confirm_pass_not_match'] = __('Password and confirm password do not match.','profile-grid');
		$error['email_not_valid'] = __('Please enter a valid e-mail address.','profile-grid');
		$error['number_not_valid'] = __('Please enter a valid number.','profile-grid');
		$error['date_not_valid'] = __('Please enter a valid date (yyyy-mm-dd format)','profile-grid');
		$error['required_field'] = __('This is a required field','profile-grid');
		$error['file_type_not_valid'] = __('This file type is not allowed.','profile-grid');
		$error['number_not_valid'] = __('Please enter a valid number.','profile-grid');
		$error['number_not_valid'] = __('Please enter a valid number.','profile-grid');
		$error['number_not_valid'] = __('Please enter a valid number.','profile-grid');
		$error['number_not_valid'] = __('Please enter a valid number.','profile-grid');
		
		return $error;
    }
	
}