package com.example.performance_tracker.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.performance_tracker.model.Performance;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Long> {
    @Query("SELECT p FROM Performance p WHERE p.dateinfo BETWEEN :startDate AND :endDate")
    List<Performance> findAllByDateinfoBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
