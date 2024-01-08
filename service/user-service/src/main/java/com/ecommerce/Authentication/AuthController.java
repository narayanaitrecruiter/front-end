package com.ecommerce.Authentication;

import com.ecommerce.Model.Client;
import com.ecommerce.Model.SigninRequest;
import com.ecommerce.Model.UpdateInfoRequest;
import com.ecommerce.Model.Vendor;
import com.ecommerce.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping(value = "/signup/client")
    public Client signupClient(@RequestBody Client clientRequest) {
        System.out.println("i am coool");
        try {
            return authService.signupClient(clientRequest);
        } catch (Exception e) {
            handleException(e);
            return null; // Handle appropriately based on your use case
        }
    }

    @PostMapping("/signup/vendor")
    public Vendor signupVendor(@RequestBody Vendor vendorRequest) {
        try {
            return authService.signupVendor(vendorRequest);
        } catch (Exception e) {
            handleException(e);
            return null; // Handle appropriately based on your use case
        }
    }




    @PostMapping("/signin/client")
    public String signinClient(@RequestBody SigninRequest signinRequest) {
        try {
            return authService.signinClient(signinRequest.getEmail(), signinRequest.getPassword());
        } catch (Exception e) {
            handleException(e);
            return null; // Handle appropriately based on your use case
        }
    }




    @PostMapping("/signin/vendor")
    public String signinVendor(@RequestBody SigninRequest signinRequest) {
        try {
            return authService.signinVendor(signinRequest.getEmail(), signinRequest.getPassword());
        } catch (Exception e) {
            handleException(e);
            return null; // Handle appropriately based on your use case
        }
    }

    @GetMapping("/vendor")
    public Vendor getVendorInfo(@RequestParam String email) {
        try {
            return authService.getVendorInfo(email);
        } catch (Exception e) {
            handleException(e);
            return null; // Handle appropriately based on your use case
        }
    }

    @PutMapping("/vendor")
    public Vendor updateVendorInfo(@RequestParam String email, @RequestBody UpdateInfoRequest updateInfoRequest) {
        try {
            return authService.updateVendorInfo(email, updateInfoRequest.getFullname(), updateInfoRequest.getShopName());
        } catch (Exception e) {
            handleException(e);
            return null; // Handle appropriately based on your use case
        }
    }

    @GetMapping("/client")
    public Client getClientInfo(@RequestParam String email) {
        //return new Client("sajib", "saji@gmail.com", "sajib@gmail.com");
        try {
            return authService.getClientInfo(email);
        } catch (Exception e) {
            handleException(e);
            return null; // Handle appropriately based on your use case
        }
    }

    //

    @PutMapping("/client")
    public Client updateClientInfo(@RequestParam String email, @RequestBody UpdateInfoRequest updateInfoRequest) {
        try {
            return authService.updateClientInfo(email, updateInfoRequest.getFullname(), updateInfoRequest.getShopName());
        } catch (Exception e) {
            handleException(e);
            return null; // Handle appropriately based on your use case
        }
    }

    private void handleException(Exception e) {
        // Handle exception as needed
        e.printStackTrace();
    }
}
