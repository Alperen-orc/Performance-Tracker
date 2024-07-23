package com.example.performance_tracker.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.performance_tracker.model.Performance;
import com.example.performance_tracker.repository.PerformanceRepository;

@RestController
@RequestMapping("/api/performances")
public class PerformanceController {

    @Autowired
    private PerformanceRepository performanceRepository;

    @GetMapping
    public List<Performance> getAllPerformances() {
        return performanceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Performance> getPerformanceById(@PathVariable Long id) {
        Optional<Performance> performance = performanceRepository.findById(id);
        if (performance.isPresent()) {
            return ResponseEntity.ok(performance.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Performance> createPerformance(@RequestBody Performance performance) {
        performance.setId(null); // Ensure ID is null
        Performance savedPerformance = performanceRepository.save(performance);
        return ResponseEntity.ok(savedPerformance);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Performance> updatePerformance(@PathVariable Long id, @RequestBody Performance performanceDetails) {
        Optional<Performance> performance = performanceRepository.findById(id);
        if (performance.isPresent()) {
            Performance updatedPerformance = performance.get();
            updatedPerformance.setAgentid(performanceDetails.getAgentid());
            updatedPerformance.setFirstname(performanceDetails.getFirstname());
            updatedPerformance.setSurname(performanceDetails.getSurname());
            updatedPerformance.setBegin(performanceDetails.getBegin());
            updatedPerformance.setEnd(performanceDetails.getEnd());
            updatedPerformance.setDateinfo(performanceDetails.getDateinfo());
            updatedPerformance.setExcuse(performanceDetails.getExcuse());
            updatedPerformance.setExcusehours(performanceDetails.getExcusehours());
            updatedPerformance.setTimeout(performanceDetails.getTimeout());
            return ResponseEntity.ok(performanceRepository.save(updatedPerformance));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerformance(@PathVariable Long id) {
        if (performanceRepository.existsById(id)) {
            performanceRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/filter")
    public List<Performance> getPerformancesByDateRange(@RequestParam("startDate") Date startDate, @RequestParam("endDate") Date endDate) {
        return performanceRepository.findAllByDateinfoBetween(startDate, endDate);
    }
}
