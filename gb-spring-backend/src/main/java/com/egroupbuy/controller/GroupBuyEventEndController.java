package com.egroupbuy.controller;

import com.egroupbuy.dao.GroupBuyEventEndDA;
import com.egroupbuy.model.GroupBuyEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gb")
public class GroupBuyEventEndController {

    @Autowired
    GroupBuyEventEndDA groupBuyEventEndDA;

    @GetMapping(value = "/admin/getAllGroupBuyEndEvent")
    public List<GroupBuyEvent> getAllGroupBuyEndEvent() {
        return GroupBuyEventEndDA.getAllGroupBuyEndEvent();
    }

    @GetMapping(value = "/user/getGroupBuyEndEvent")
    public List<GroupBuyEvent> getAllGroupBuyEndEvent(@RequestParam int sid) {
        return GroupBuyEventEndDA.getGroupBuyEndEvent(sid);
    }

}
