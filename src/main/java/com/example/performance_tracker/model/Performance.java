package com.example.performance_tracker.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import java.sql.Date;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "Performance")

public class Performance {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "performance_seq")
    @SequenceGenerator(name = "performance_seq", sequenceName = "performance_seq", allocationSize = 1)
	private Long id;

	@Column(name = "Agentid", nullable = false, length = 100)
	private String agentid;
	@Column(name = "Firstname", nullable = false, length = 100)
	private String firstname;

	@Column(name = "Surname", nullable = false, length = 100)
	private String surname;

	@Column(name = "Begin")
	private Timestamp begin;

	@Column(name = "End")
	private Timestamp end;

	@Column(name = "Dateinfo")
	private Date dateinfo;

	@Column(name = "Excuse", length = 100)
	private String excuse;

	@Column(name = "Excusehours")
	private Long excusehours;

	@Column(name = "Timeout")
	private Long timeout;

	// Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAgentid() {
		return agentid;
	}

	public void setAgentid(String agentid) {
		this.agentid = agentid;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Timestamp getBegin() {
		return begin;
	}

	public void setBegin(Timestamp begin) {
		this.begin = begin;
	}

	public Timestamp getEnd() {
		return end;
	}

	public void setEnd(Timestamp end) {
		this.end = end;
	}

	public Date getDateinfo() {
		return dateinfo;
	}

	public void setDateinfo(Date dateinfo) {
		this.dateinfo = dateinfo;
	}

	public String getExcuse() {
		return excuse;
	}

	public void setExcuse(String excuse) {
		this.excuse = excuse;
	}

	public Long getExcusehours() {
		return excusehours;
	}

	public void setExcusehours(Long excusehours) {
		this.excusehours = excusehours;
	}

	public Long getTimeout() {
		return timeout;
	}

	public void setTimeout(Long timeout) {
		this.timeout = timeout;
	}
}
