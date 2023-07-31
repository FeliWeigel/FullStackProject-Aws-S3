package com.wmdev.WmFullStackProffesional.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket apiDocs(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }

    public ApiInfo apiInfo(){
        return new ApiInfo("Fullstack Project Dashboard Todo App.", "Project documentation.", "1.0", "https://google.com", new Contact("WMDev", "https://www.linkedin.com/in/felipe-weigel", "fweigel24@gmail.com"),
                "null", "https://google.com", Collections.emptyList());
    }

}
