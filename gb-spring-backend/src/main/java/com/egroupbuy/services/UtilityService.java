package com.egroupbuy.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class UtilityService {
    public static final String UPLOAD_PATH = "uploads";
    private final Path root = Paths.get("");

    public String saveFile(MultipartFile file, String user_id) throws IOException {
        String userUploadFolder = UPLOAD_PATH + "/" + user_id;
        File f = new File(userUploadFolder);
        if (!f.exists())
            f.mkdir();
        String filename = file.getOriginalFilename();
        String name = filename.substring(0, filename.lastIndexOf("."));
        String extension = filename.substring(filename.lastIndexOf("."));
        String filePath = userUploadFolder.concat("/").concat(filename);
        int count = 1;
        while (true) {
            try {
                Files.copy(file.getInputStream(), Paths.get(filePath));
                break;
            } catch (FileAlreadyExistsException e) {
                filePath = userUploadFolder.concat("/").concat(name).concat("(").concat(String.valueOf(count++)).concat(")")
                        .concat(extension);
            }
        }
        return filePath;
    }

    public boolean deleteUploadedFile(String filenameUrl) {
        try {
            Path file = root.resolve(filenameUrl);
            System.out.println("============ deleteUploadedFile file " + file);

            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public InputStream getFile(String path) throws FileNotFoundException {
        String filePath = UPLOAD_PATH.concat("/").concat(path);
        System.out.println("==========> UtilityService filePath : " + filePath );
        InputStream is = new FileInputStream(filePath);
        return is;
    }

    public InputStream getImageFile(String imgpath) throws FileNotFoundException {
        Path file = root.resolve(imgpath);
        String filePath = "/" + imgpath;
        System.out.println("==========> UtilityService filePath : " + filePath );
        System.out.println("==========> UtilityService filePath : " + file );

        InputStream is = new FileInputStream(file.toString());
        return is;
    }

}
