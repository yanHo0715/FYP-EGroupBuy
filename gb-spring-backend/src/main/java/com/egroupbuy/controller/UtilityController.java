package com.egroupbuy.controller;


import com.egroupbuy.services.UtilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.io.IOException;
import java.io.InputStream;


@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/gb")
//@RequestMapping("/")
public class UtilityController {


    @Autowired
    UtilityService utilityService;

    @PostMapping("/upload")
    public HashMap<String, String> fileUpload(@RequestParam("file") MultipartFile file, @RequestParam("user_id") String user_id) throws IOException {
        HashMap<String, String> m = new HashMap<>();
        String url = utilityService.saveFile(file, user_id);
        m.put("status", "success");
        m.put("fileUrl", url);
        return m;
    }

    @GetMapping(value = "uploads/{user_id}/{fileName}", produces = MediaType.ALL_VALUE)
    public void fileDownload(@PathVariable("user_id") String user_id, @PathVariable("fileName") String fileName, HttpServletResponse response)
            throws IOException {
        System.out.println("==========> UtilityController fileDownload : " + user_id );
        System.out.println("==========> UtilityController fileDownload : " + fileName );
        InputStream is = utilityService.getFile(user_id + "/" + fileName);
        response.setContentType(MediaType.ALL_VALUE);
        StreamUtils.copy(is, response.getOutputStream());
    }

    @GetMapping(value = "download", produces = MediaType.ALL_VALUE)
    public void imageDownload(@RequestParam("filenameUrl") String filenameUrl, HttpServletResponse response)
            throws IOException {
//        System.out.println("==========> UtilityController fileDownload : " + user_id );
        System.out.println("==========> UtilityController fileDownload : " + filenameUrl );
        InputStream is = utilityService.getImageFile(filenameUrl);
        response.setContentType(MediaType.ALL_VALUE);
        StreamUtils.copy(is, response.getOutputStream());
    }

    @PostMapping("/deleteuploadfile")
    public HashMap<String, String> deleteUploadedFile(@RequestParam("filenameUrl") String filenameUrl) throws IOException {
        HashMap<String, String> m = new HashMap<>();
        boolean result = utilityService.deleteUploadedFile(filenameUrl);
        if (result) {
            m.put("status", "success");
            m.put("result", "success");
        } else {
            m.put("status", "fail");
            m.put("result", "fail");
        }
        return m;
    }




}
