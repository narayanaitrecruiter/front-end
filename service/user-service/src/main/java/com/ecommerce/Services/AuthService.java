package com.ecommerce.Services;

import com.ecommerce.Model.Client;
import com.ecommerce.Model.Vendor;
import com.ecommerce.Repository.ClientRepository;
import com.ecommerce.Repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final ClientRepository clientRepository;
    private final VendorRepository vendorRepository;

    @Autowired
    public AuthService(ClientRepository clientRepository, VendorRepository vendorRepository) {
        this.clientRepository = clientRepository;
        this.vendorRepository = vendorRepository;
    }

    public Client signupClient(Client client) {

        client.setFullname(client.getFullname());
        client.setPassword(client.getPassword());
        client.setEmail(client.getEmail());
        return clientRepository.save(client);
    }



    public Vendor signupVendor(Vendor vendor){
        vendor.setFullname(vendor.getFullname());
        vendor.setPassword(vendor.getPassword());
        vendor.setEmail(vendor.getEmail());
        vendor.setShopName(vendor.getShopName());
        vendor.setShopCountry(vendor.getShopCountry());

        return vendorRepository.save(vendor);

    }

    public String signinClient(String email, String password) {
        Client client = getClientByEmail(email);
        validateClientCredentials(client, password);
        return "example_token";
    }

    public String signinVendor(String email, String password) {
        Vendor vendor = getVendorByEmail(email);
        validateVendorCredentials(vendor, password);
        return "example_token";
    }




    public Vendor getVendorInfo(String email) {
        return getVendorByEmail(email);
    }

    public Vendor updateVendorInfo(String email, String fullname, String shopName) {
        Vendor vendor = getVendorByEmail(email);
        updateVendorDetails(vendor, fullname, shopName);
        return vendorRepository.save(vendor);
    }
//


    public Client getClientInfo(String email) {
        return getClientByEmail(email);
    }

    public Client updateClientInfo(String email, String fullname, String password) {
        Client client = getClientByEmail(email);
        updateClientDetails(client, fullname, password);
        return clientRepository.save(client);
    }

    private Client getClientByEmail(String email) {
        Client client = clientRepository.findByEmail(email);
        if (client == null) {
            throw new RuntimeException("Client not found");
        }
        return client;
    }

    private Vendor getVendorByEmail(String email) {
        Vendor vendor = vendorRepository.findByEmail(email);
        if (vendor == null) {
            throw new RuntimeException("Vendor not found");
        }
        return vendor;
    }

    private void validateClientCredentials(Client client, String password) {
        if (client == null || !password.equals(client.getPassword())) {
            throw new RuntimeException("Invalid client credentials");
        }
    }

    private void validateVendorCredentials(Vendor vendor, String password) {
        if (vendor == null || !password.equals(vendor.getPassword())) {
            throw new RuntimeException("Invalid vendor credentials");
        }
    }

    private void updateVendorDetails(Vendor vendor, String fullname, String shopName) {
        if (fullname != null) {
            vendor.setFullname(fullname);
        }

        if (shopName != null) {
            vendor.setShopName(shopName);
        }
    }

    private void updateClientDetails(Client client, String fullname, String password) {
        if (fullname != null) {
            client.setFullname(fullname);
        }

        if (password != null) {
            client.setPassword(password);
        }
    }
}
