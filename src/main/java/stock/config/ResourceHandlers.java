package stock.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableWebMvc
@Configuration
public class ResourceHandlers extends WebMvcConfigurerAdapter {

    @Value("${file.MappingPath}")
    private String fileMappingPath;

    @Value("${file.MappingUrl}")
    private String fileMappingUrl;

    @Value("${image.MappingPath}")
    private String imageMappingPath;

    @Value("${image.MappingUrl}")
    private String imageMappingUrl;

    @Value("${audio.MappingPath}")
    private String audioMappingPath;

    @Value("${audio.MappingUrl}")
    private String audioMappingUrl;

    @Value("${video.MappingPath}")
    private String videoMappingPath;

    @Value("${video.MappingUrl}")
    private String videoMappingUrl;

    @Value("${banner.MappingPath}")
    private String bannerMappingPath;

    @Value("${banner.MappingUrl}")
    private String bannerMappingUrl;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String[] staticFileMappingPath = { "file:///"+fileMappingPath };
        String[] staticImageMappingPath = { "file:///"+imageMappingPath };
        String[] staticAudioMappingPath = { "file:///"+audioMappingPath };
        String[] staticVideoMappingPath = { "file:///"+videoMappingPath };
        String[] staticBannerMappingPath = { "file:///"+bannerMappingPath };
        String[] staticWebMappingPath = { "/"};
        registry.addResourceHandler(fileMappingUrl+"**").addResourceLocations(staticFileMappingPath);
        registry.addResourceHandler(imageMappingUrl+"**").addResourceLocations(staticImageMappingPath);
        registry.addResourceHandler(audioMappingUrl+"**").addResourceLocations(staticAudioMappingPath);
        registry.addResourceHandler(videoMappingUrl+"**").addResourceLocations(staticVideoMappingPath);
        registry.addResourceHandler(bannerMappingUrl+"**").addResourceLocations(staticBannerMappingPath);
        registry.addResourceHandler("/**").addResourceLocations(staticWebMappingPath);
        super.addResourceHandlers(registry);
    }
}

