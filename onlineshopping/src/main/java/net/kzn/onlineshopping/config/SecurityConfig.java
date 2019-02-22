package net.kzn.onlineshopping.config;
  
import java.util.Arrays;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import net.kzn.onlineshopping.security.JWTAuthenticationFilter;
import net.kzn.onlineshopping.security.JWTAuthorizationFilter;
import net.kzn.onlineshopping.service.CustomUserDetailService;

@Configuration
@EnableWebSecurity
//@ComponentScan(basePackages = { "net.kzn.onlineshopping.config" })
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired DataSource dataSource;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private CustomUserDetailService customUserDetailService;
	
	/*@Bean
	public UserDetailsService userDetailsService() {
		InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
		manager.createUser(User.withUsername("user").password("password").roles("USER").build());
		return manager;
	}*/
  	 
	 @Override
		public void configure(WebSecurity web) throws Exception {
			web.ignoring().antMatchers("/resources/**");
 		}
	 
	//1. Default
	//Default configuration in WebSecurityConfigurerAdapter
	/*protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.and()
			.httpBasic();
	}*/
	
	//2. Custom Login Form
	//Override Default configuration in WebSecurityConfigurerAdapter for custom login form instead auto generated login form by spring security
	//The updated configuration specifies the location of the log in page.
	//We must grant all users (i.e. unauthenticated users) access to our log in page
	/*@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/login") 
				.permitAll();        
	}*/
	
	//3. Customization to authorize request
	//Override Default configuration in WebSecurityConfigurerAdapter for custom login form and authorize requests
	//We specified multiple URL patterns that any user can access like "/resources/", "/scripts/", "/css/" etc.
	//Any URL that starts with "/admin/" will be restricted to users who have the role "ROLE_ADMIN". 
	//Any URL that starts with "/db/" requires the user to have both "ROLE_ADMIN" and "ROLE_DBA". 
	//Any URL that has not already been matched on only requires that the user be authenticated
	@Override
	protected void configure(HttpSecurity http) throws Exception { 
		 http.
		 cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
        .and().csrf().disable()
  	            .authorizeRequests()                                                                
				.antMatchers("/**").permitAll()                  
				.antMatchers("/manage/**").hasRole("ADMIN")                                      
				.antMatchers("/").hasRole("USER")
				//.antMatchers("/cart/**").hasRole("USER")            
				//.and()
				//.formLogin()
				//.loginPage("/login")
				//.permitAll()
				//.and()
				//.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
				//.logoutSuccessUrl("/login?logout").deleteCookies("JSESSIONID")
				//.invalidateHttpSession(true) 
				//.permitAll()
				.and()
				.exceptionHandling()
	            .accessDeniedPage("/access-denied")
	            .and()
	 			.addFilter(new JWTAuthenticationFilter(authenticationManager()))
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), customUserDetailService));
  	}
 	 
	 @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	        auth.userDetailsService(customUserDetailService).passwordEncoder(new BCryptPasswordEncoder());
	   }
	 
/*     private Filter csrfHeaderFilter() {
		return new OncePerRequestFilter() {
			@Override
			protected void doFilterInternal(HttpServletRequest request,
					HttpServletResponse response, FilterChain filterChain)
							throws ServletException, IOException {
				CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
				if (csrf != null) {
					Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
					String token = csrf.getToken();
					if (cookie == null || token != null && !token.equals(cookie.getValue())) {
						cookie = new Cookie("XSRF-TOKEN", token);
						cookie.setPath("/");
						response.addCookie(cookie);
					}
				}
				filterChain.doFilter(request, response);
			}
		};
	}

	private CsrfTokenRepository csrfTokenRepository() {
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName("X-XSRF-TOKEN");
		return repository;
	}*/
	
	@Bean   
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Access-Control-Allow-Origin","Authorization", "Cache-Control", "Content-Type", "xsrfheadername","xsrfcookiename"
        ,"X-Requested-With","XSRF-TOKEN","Accept", "x-xsrf-token","withcredentials","x-csrftoken"));
        configuration.setExposedHeaders(Arrays.asList("custom-header1", "custom-header2"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); 
        return source; 
    }
 
	
	
	//In memory authentication java configuration
	//Not web-specific
	/*@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.inMemoryAuthentication() //Adds a UserDetailsManagerConfigurer
				//login, password and supported role
				.withUser("user").password("password").roles("USER").and()
				.withUser("admin").password("adminpassword").roles("ADMIN").and()
				.withUser("dinesh").password("support").roles("SUPPORT");
	}*/
	
	//JDBC Authentication
	//Provides default queries
	//� SELECT username, password, enabled FROM users WHERE username = ?
	//� SELECT username, authority FROM authorities WHERE username = ?
	//We can customize the default queries by using following methods
	//usersByUsernameQuery()
	//authoritiesByUsernameQuery()
	//groupAuthoritiesByUsername()

	/*@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.jdbcAuthentication()
			.usersByUsernameQuery("select email, password, enabled from user_detail where email = ?")
			.authoritiesByUsernameQuery("select email, role from user_detail where email = ?")
			.dataSource(dataSource)
			.passwordEncoder(bCryptPasswordEncoder);
		 System.out.println("inside security config");
	}*/
	
	
	  /*@Override
	  protected void configure(AuthenticationManagerBuilder auth) throws Exception {

	    auth.jdbcAuthentication().dataSource(dataSource)
	        .usersByUsernameQuery("select username, password, enabled"
	            + " from users where username=?")
	        .authoritiesByUsernameQuery("select username, authority "
	            + "from authorities where username=?")
	        .passwordEncoder(new BCryptPasswordEncoder());
	  }
*/
}

