package com.example.performance_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.performance_tracker.model.Performance;
import com.example.performance_tracker.repository.PerformanceRepository;

@RestController
@RequestMapping("/api/report")
@PreAuthorize("hasRole('ADMIN')")
public class ReportController {

	@Autowired
    private PerformanceRepository performanceRepository;

    @GetMapping
    public List<Performance> getAllPerformances() {
        return performanceRepository.findAll();
    }

}
